import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Estate as MySqlEstate } from 'src/entity/jgb2/estates.entity';
import { Estate } from 'src/entity/jgb3/estates.entity';
import { Repository, DataSource, Point } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BUILDING_TYPE, PURPOSE_KEY, USAGE } from '../common/enums/estate.enum';

@Injectable()
export class CronjobsService {
    private readonly logger = new Logger(CronjobsService.name);

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheService: Cache,

        @InjectDataSource('jgb3')
        private dataSource: DataSource,

        @InjectRepository(Estate, 'jgb3')
        private postgreEstateRepository: Repository<Estate>,

        @InjectRepository(MySqlEstate, 'jgb2')
        private mysqlEstateRepository: Repository<MySqlEstate>,
    ) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async syncEstate() {
        this.logger.log(`Start Sync Estate Data.`);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 取得上次同步時間
            const jobStartTime = new Date();
            const redisKey = 'cronjob:sync_database:estate';
            const cacheData = await this.cacheService.get<string>(redisKey);
            const lastSyncDate = cacheData ? new Date(cacheData) : null;

            // 取得同步時間內的 2.0 資料
            const queryBuilder = this.mysqlEstateRepository.createQueryBuilder('estates');
            if (cacheData) queryBuilder.where('estates.updated_at > :lastSyncDate', { lastSyncDate: new Date(lastSyncDate) });
            const result = await queryBuilder
                .select([
                    'estates.id',
                    'estates.full_address',
                    'estates.title',
                    'estates.rent',
                    'estates.latitude',
                    'estates.longitude',
                    'estates.use_for',
                    'estates.building',
                    'estates.floor',
                    'estates.floor_all',
                    'estates.size',
                    'estates.size_data',
                    'estates.gallery',
                    'estates.property_purpose_key',
                    'estates.social_housing_pattern_count',
                    'estates.facilities',
                    'estates.country_id',
                    'estates.city_id',
                    'estates.district_id',
                    'estates.created_at',
                    'estates.updated_at',
                ])
                .getMany();

            if (!result) return await queryRunner.commitTransaction();

            // 轉換資料形式
            const transformedResult = result.map((element) => {
                const usage = this.convertUsage(element.use_for);
                const buildingType = this.convertBuildingType(element.building);
                const layout = this.convertLayoutFormat(element.property_purpose_key, {
                    general: element.facilities ? JSON.parse(element.facilities) : null,
                    social: element.social_housing_pattern_count ? JSON.parse(element.social_housing_pattern_count) : null,
                });
                const size = this.convertSize(element.size, element.size_data);

                const estate = new Estate();
                estate.id = element.id;
                estate.address = element.full_address ?? '';
                estate.name = element.title ?? '';
                estate.rent = element.rent ?? 0;
                estate.coordinates = {
                    type: 'Point',
                    coordinates: [element.longitude, element.latitude],
                } as unknown as Point;
                estate.usage = usage;
                estate.type = element.property_purpose_key;
                estate.building_type = buildingType;
                estate.floor = element.floor;
                estate.total_floor = element.floor_all;
                estate.size = size;
                estate.gallery = element.gallery ? JSON.parse(element.gallery) : null;
                estate.room_count = layout.room;
                estate.layout = layout;
                estate.country_id = element.country_id;
                estate.city_id = element.city_id;
                estate.district_id = element.district_id;
                estate.created_at = element.created_at ?? new Date();
                estate.updated_at = element.updated_at ?? new Date();

                return estate;
            });

            // 寫入 3.0 資料
            const response = await queryRunner.manager.save(transformedResult);
            this.logger.log(`Sync ${response.length} Estate.`);

            // 寫入同步時
            // await this.cacheService.set(redisKey, jobStartTime);
            await queryRunner.commitTransaction();
        } catch (error) {
            this.logger.log(`${error}`);
            await queryRunner.rollbackTransaction();
        } finally {
            this.logger.log(`Release Sync Estate Transaction.`);
            await queryRunner.release();
        }

        this.logger.log(`Finish Sync Estate Data.`);
    }

    private convertSize(size: number, sizeData: Record<string, any>) {
        let result = null;
        if (size) return size;
        result = sizeData && sizeData.size?.m2 ? sizeData.size?.m2 : null;
        return result;
    }

    private convertUsage(usage: string) {
        switch (usage) {
            case 'residential':
                return USAGE.RESIDENTIAL;
            case 'business':
                return USAGE.BUSINESS;
            case 'parking_space':
                return USAGE.PARKING_SPACE;
            default:
                return USAGE.UNDEFINED;
        }
    }

    private convertBuildingType(type: string) {
        switch (type) {
            case 'condo':
                return BUILDING_TYPE.CONDO;
            case 'apartment':
                return BUILDING_TYPE.APARTMENT;
            case 'villa':
                return BUILDING_TYPE.VILLA;
            case 'townhouse':
                return BUILDING_TYPE.TOWNHOUSE;
            case 'condominium':
                return BUILDING_TYPE.CONDOMINIUM;
            case 'farmhouse':
                return BUILDING_TYPE.FARMHOUSE;
            default:
                return BUILDING_TYPE.UNDEFINED;
        }
    }

    private convertLayoutFormat(purposeKey: number, data: Record<string, any>) {
        const { general: generalData, social: socialData } = data;
        const layout = { room: 0, living_room: 0, office: 0, bathroom: 0, kitchen: 0, balcony: 0 };

        switch (purposeKey) {
            case PURPOSE_KEY.GENERAL_HOUSING:
                if (!generalData || !generalData.pattern) return layout;
                const generalPattern = generalData.pattern;
                layout.room = generalPattern.room ? generalPattern.room.length : 0;
                layout.living_room = generalPattern.living_room ? generalPattern.living_room.length : 0;
                layout.office = generalPattern.office ? generalPattern.office.length : 0;
                layout.bathroom = generalPattern.bathroom ? generalPattern.bathroom.length : 0;
                layout.kitchen = generalPattern.kitchen ? generalPattern.kitchen.length : 0;
                layout.balcony = generalPattern.balcony ? generalPattern.balcony.length : 0;
                return layout;
            case PURPOSE_KEY.SOCIAL_HOUSING:
                if (!socialData) return layout;
                return { ...socialData, office: 0 };
            case PURPOSE_KEY.SHARE_HOUSING:
            default:
                return layout;
        }
    }
}

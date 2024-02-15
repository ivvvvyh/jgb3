import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Country } from 'src/entity/countries.entity';
import { Estate } from 'src/entity/estates.entity';
import { GetMapInfoDTO, CoordinateDTO, PaginatedDTO, InfoResponseDTO, EstateResponseDTO } from 'src/resolvers/map/dto/map.dto';
import { InterServerException, NotFoundException } from 'src/common/exceptions/custom.exception';
import { MAP_VIEW_LEVEL } from 'src/common/enums/map.enum';
import { BaseService } from 'src/services/base.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MapService extends BaseService<Estate> {
    constructor(
        @Inject(CACHE_MANAGER)
        private cacheService: Cache,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        @InjectRepository(Estate)
        private estateRepository: Repository<Estate>,

        private readonly httpService: HttpService,
        private configService: ConfigService,
    ) {
        super(estateRepository);
    }

    async getCountryCodeById(countryId: number): Promise<string> {
        const result = await this.countryRepository.findOne({ where: { id: countryId } });
        if (!result) throw new NotFoundException('Country Not Found.');
        return result.code;
    }

    async getCountryCodeByCoordinate(coordinates: CoordinateDTO): Promise<string> {
        const { latitude, longitude } = coordinates;
        const response = await firstValueFrom(
            this.httpService
                .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                    params: { latlng: `${latitude},${longitude}`, key: this.configService.get('GOOGLE_API_KEY') },
                })
                .pipe(
                    map((response: AxiosResponse<any>) => {
                        const countryComponent = response.data.results[0].address_components.find((component) => component.types.includes('country'));
                        return countryComponent.short_name;
                    }),
                    catchError((error) => {
                        throw new InterServerException(error);
                    }),
                ),
        );
        return response;
    }

    async getEstatesAmountInRange(data: Omit<GetMapInfoDTO, 'zoom'> & { level: MAP_VIEW_LEVEL }): Promise<InfoResponseDTO[]> {
        const { countryId, cityId, districtId, level, center, radius } = data;

        const queryBuilder = this.estateRepository.createQueryBuilder('estate');

        const whereConditions: Record<string, any> = { country_id: countryId, city_id: cityId, district_id: districtId };
        Object.entries(whereConditions).forEach(([key, value]) => {
            if (value) queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
        });

        let selectColumns: string[];
        let groupByColumns: string[];

        let redisKey = `map:level:${level}:country:${countryId ?? 0}:city:${cityId ?? 0}:district:${districtId ?? 0}`;
        switch (level) {
            case MAP_VIEW_LEVEL.COUNTRY:
                selectColumns = ['country_id', 'COUNT(id) as amount'];
                groupByColumns = ['country_id'];
                break;

            case MAP_VIEW_LEVEL.CITY:
                selectColumns = ['country_id', 'city_id', 'COUNT(id) as amount'];
                groupByColumns = ['country_id', 'city_id'];
                break;

            case MAP_VIEW_LEVEL.DISTRICT:
                selectColumns = ['country_id', 'city_id', 'district_id', 'COUNT(id) as amount'];
                groupByColumns = ['country_id', 'city_id', 'district_id'];
                break;

            case MAP_VIEW_LEVEL.ESTATE:
                selectColumns = [
                    `ST_X(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)) AS longitude`,
                    `ST_Y(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)) AS latitude`,
                    'COUNT(*) AS amount',
                ];
                groupByColumns = [
                    `ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)::geography`,
                    `ST_X(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01))`,
                    `ST_Y(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01))`,
                ];

                if (center && radius) {
                    const { longitude, latitude } = center;
                    queryBuilder
                        .andWhere(
                            `ST_DWithin(
                                estate.coordinates::geography,
                                ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326),
                                :radius
                            )`,
                        )
                        .setParameters({ longitude, latitude, radius });
                }
                const result = await queryBuilder.select(selectColumns).groupBy(groupByColumns.join(',')).getRawMany();
                const transformedResult = result.map((item) => ({
                    coordinates: { latitude: item.latitude, longitude: item.longitude },
                    amount: item.amount,
                }));
                return transformedResult;
            default:
                break;
        }

        const cacheData = await this.cacheService.get<string>(redisKey);
        if (cacheData) return JSON.parse(cacheData);

        const result = await queryBuilder.select(selectColumns).groupBy(groupByColumns.join(',')).getRawMany();
        const transformedResult = result.map((element) => plainToClass(InfoResponseDTO, element, { strategy: 'excludeAll' }));
        await this.cacheService.set(redisKey, JSON.stringify(transformedResult), 12 * 60 * 60 * 1000);
        return transformedResult;
    }

    async getEstatesByPage(data: Omit<GetMapInfoDTO, 'zoom'> & Omit<PaginatedDTO, 'page'>) {
        const { countryId, cityId, districtId, center, radius, skip, offset } = data;

        const queryBuilder = this.estateRepository.createQueryBuilder('estate');
        // 地區條件
        const whereConditions: Record<string, any> = { country_id: countryId, city_id: cityId, district_id: districtId };
        Object.entries(whereConditions).forEach(([key, value]) => {
            if (value) queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
        });

        // 定位點條件
        if (center && radius) {
            const { longitude, latitude } = center;
            queryBuilder
                .andWhere(
                    `ST_DWithin(
                estate.coordinates::geography,
                ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326),
                :radius
            )`,
                )
                .setParameters({ longitude, latitude, radius });
        }

        let result = await queryBuilder
            .select([
                'id',
                'name',
                'country_id',
                'city_id',
                'district_id',
                'address',
                'ST_X(coordinates::geometry) AS longitude',
                'ST_Y(coordinates::geometry) AS latitude',
                'floor',
                'total_floor',
                'usage',
                'building_type',
                'rent',
                'gallery',
                'layout',
                'size',
                'room_count',
            ])
            .skip(skip)
            .take(offset)
            .getRawMany();

        result = result.map((item) =>
            plainToClass(EstateResponseDTO, { ...item, coordinates: { latitude: item.latitude, longitude: item.longitude } }),
        );

        let totalCount = await queryBuilder.getCount();

        return { result, totalCount };
    }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Country } from 'src/entity/countries.entity';
import { Estate } from 'src/entity/estates.entity';
import { GetMapInfoDTO, CoordinateDTO } from 'src/resolvers/map/dto/map.dto';
import { InterServerException, NotFoundException } from 'src/common/exceptions/custom.exception';
import { MAP_VIEW_LEVEL } from 'src/common/enums/map.enum';
import { BaseService } from 'src/services/base.service';

@Injectable()
export class MapService extends BaseService<Estate> {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        @InjectRepository(Estate)
        private estateRepository: Repository<Estate>,

        private readonly httpService: HttpService,

        private configService: ConfigService,
    ) {
        super(estateRepository);
    }

    async getCountryCodeById(countryId: number) {
        const result = await this.countryRepository.findOne({ where: { id: countryId } });
        if (!result) throw new NotFoundException('Country Not Found.');
        return result.code;
    }

    async getCountryCodeByCoordinate(coordinates: CoordinateDTO) {
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

    async getViewAmount(data: Omit<GetMapInfoDTO, 'zoom'> & { level: MAP_VIEW_LEVEL }) {
        const { country_id, city_id, district_id, level, center, radius } = data;

        const queryBuilder = this.estateRepository.createQueryBuilder('estate');

        const whereConditions: Record<string, any> = { country_id, city_id, district_id };
        Object.entries(whereConditions).forEach(([key, value]) => {
            if (value) {
                queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
            }
        });

        let selectColumns: string[];
        let groupByColumns: string[];

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

            default:
                selectColumns = [
                    `ST_X(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)) AS latitude`,
                    `ST_Y(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)) AS longitude`,
                    'COUNT(*) AS amount',
                ];
                groupByColumns = [
                    `ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01)::geography`,
                    `ST_X(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01))`,
                    `ST_Y(ST_SnapToGrid(estate.coordinates::geometry, 0.01, 0.01))`,
                ];
                break;
        }

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

        if (level === MAP_VIEW_LEVEL.ESTATE) {
            const transformedResult = result.map((item) => ({
                coordinates: {
                    latitude: item.latitude,
                    longitude: item.longitude,
                },
                amount: item.amount,
            }));
            return transformedResult;
        }

        return result;
    }
}

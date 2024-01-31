import { Resolver, Query, Args } from '@nestjs/graphql';
import { MapInfo } from 'src/models/map/map.model';
import { GetMapInfoDTO, MapInfoResponseDTO } from './dto/map.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { MapService } from 'src/services/map/map.service';
import { getMapViewLevel } from 'src/utils/map.utils';
import { MAP_VIEW_LEVEL } from 'src/common/enums/map.enum';

@Public()
@Resolver((of) => MapInfo)
export class MapResolver {
    constructor(private mapService: MapService) {}

    @Query((returns) => [MapInfoResponseDTO], { name: 'mapInfo' })
    async getMapInfo(@Args() args: GetMapInfoDTO) {
        const { zoom, ...mapInfoArgs } = args;
        const { center, country_id } = mapInfoArgs;

        let viewLevel = MAP_VIEW_LEVEL.COUNTRY;
        const countryZoomLevel = 3;
        if (zoom > countryZoomLevel) {
            const countryCode = country_id
                ? await this.mapService.getCountryCodeById(country_id)
                : await this.mapService.getCountryCodeByCoordinate(center);
            viewLevel = getMapViewLevel(countryCode, zoom);
        }

        const result = await this.mapService.getViewAmount({ level: viewLevel, ...mapInfoArgs });
        return result;
    }
}

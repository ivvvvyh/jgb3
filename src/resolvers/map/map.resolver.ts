import { Resolver, Query, Args, ResolveField, Context } from '@nestjs/graphql';
import { GetMapInfoDTO, MapInfoResponseDTO, PaginatedEstateDTO, PaginatedDTO } from './dto/map.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { MapService } from 'src/services/map/map.service';
import { getMapViewLevel } from 'src/utils/map.utils';
import { MAP_VIEW_LEVEL } from 'src/common/enums/map.enum';

@Public()
@Resolver((of) => MapInfoResponseDTO)
export class MapResolver {
    constructor(private mapService: MapService) {}

    @Query((returns) => MapInfoResponseDTO, { name: 'mapInfo' })
    async getMapInfo(@Args() args: GetMapInfoDTO, @Context() ctx) {
        const { zoom, ...mapInfoArgs } = args;
        const { center, countryId } = mapInfoArgs;
        ctx.getMapInfoArgs = mapInfoArgs;

        let viewLevel = MAP_VIEW_LEVEL.COUNTRY;
        const countryZoomLevel = 8;
        if (zoom > countryZoomLevel) {
            const countryCode = countryId
                ? await this.mapService.getCountryCodeById(countryId)
                : await this.mapService.getCountryCodeByCoordinate(center);
            viewLevel = getMapViewLevel(countryCode, zoom);
        }

        const result = await this.mapService.getEstatesAmountInRange({ ...mapInfoArgs, level: viewLevel });
        return { info: result };
    }

    @ResolveField('estates', (returns) => PaginatedEstateDTO)
    async getEstates(@Args() args: PaginatedDTO, @Context() ctx) {
        const mapInfoArgs = ctx.getMapInfoArgs;
        const { page = 1, offset = 20 } = args;
        const skip = (page - 1) * offset;

        const { result, totalCount } = await this.mapService.getEstatesByPage({ ...mapInfoArgs, skip, offset });
        const edges = result.map((element) => ({ cursor: element.id.toString(), node: element }));
        const hasNextPage = skip + offset < totalCount;

        return { edges, nodes: result, hasNextPage, totalCount };
    }
}

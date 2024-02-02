import { viewLevel } from 'src/config/map.config';
import { MAP_VIEW_LEVEL } from 'src/common/enums/map.enum';
import { NotFoundException } from 'src/common/exceptions/custom.exception';

/**
 * 取得地圖顯示層級（國家/城市/鄉鎮/物件）
 * @param country
 * @param zoom
 * @returns
 */
export const getMapViewLevel = (country: string, zoom: number) => {
    const countryConfig = viewLevel[country];
    if (!countryConfig) throw new NotFoundException();

    const { country: countryLevel, city, district } = countryConfig;
    if (zoom <= countryLevel) return MAP_VIEW_LEVEL.COUNTRY;
    if (zoom <= city) return MAP_VIEW_LEVEL.CITY;
    if (zoom <= district) return MAP_VIEW_LEVEL.DISTRICT;
    return MAP_VIEW_LEVEL.ESTATE;
};

import { ArgsType, Field, Int, InputType, ObjectType, Float } from '@nestjs/graphql';
import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Paginated } from 'src/utils/pagination.utils';

@InputType()
export class LocationInput {
    @Field(() => Float, { nullable: false, description: '緯度' })
    @IsNotEmpty()
    latitude: number;

    @Field(() => Float, { nullable: false, description: '經度' })
    @IsNotEmpty()
    longitude: number;
}

@ObjectType()
export class CoordinateDTO {
    @Field(() => Float, { nullable: true, description: '緯度' })
    latitude: number;

    @Field(() => Float, { nullable: true, description: '經度' })
    longitude: number;
}

@ArgsType()
export class GetMapInfoDTO {
    @Field((type) => Int, { description: '縮放級距' })
    @IsInt()
    @IsNotEmpty()
    zoom: number;

    @Field(() => LocationInput, { description: '地圖中心點' })
    @Type(() => LocationInput)
    center: LocationInput;

    @Field((type) => Int, { description: '半徑（米）' })
    @IsInt()
    @IsNotEmpty()
    radius: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    countryId?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    cityId?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    districtId?: number;

    @Field((type) => Int, { nullable: true, description: '建築類型' })
    @IsInt()
    @IsOptional()
    buildingType?: number;

    @Field((type) => Int, { nullable: true, description: '空間型態' })
    @IsInt()
    @IsOptional()
    spaceType?: number;

    @Field((type) => Int, { nullable: true, description: '房間數量' })
    @IsInt()
    @IsOptional()
    roomCount?: number;

    @Field((type) => Int, { nullable: true, description: '最低房間數量' })
    @IsInt()
    @IsOptional()
    minRoomCount?: number;

    @Field((type) => Int, { nullable: true, description: '最低租金' })
    @IsInt()
    @IsOptional()
    minRent?: number;

    @Field((type) => Int, { nullable: true, description: '最高租金' })
    @IsInt()
    @IsOptional()
    maxRent?: number;
}

@ObjectType()
export class AreaInput {
    @Field((type) => Int, { nullable: true })
    @IsInt()
    @Expose({ name: 'country_id' })
    @IsOptional()
    countryId?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @Expose({ name: 'city_id' })
    @IsOptional()
    cityId?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @Expose({ name: 'district_id' })
    @IsOptional()
    districtId?: number;
}

@ObjectType()
export class InfoResponseDTO extends AreaInput {
    @Field(() => CoordinateDTO, { nullable: true, description: '座標' })
    coordinates?: CoordinateDTO;

    @Field((type) => Int)
    @IsInt()
    @Expose()
    amount: number;
}

@Expose()
@ObjectType()
export class EstateResponseDTO extends AreaInput {
    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    id: number;

    @Field((type) => String, { nullable: true, description: '物件名稱' })
    @IsString()
    @IsOptional()
    name?: string;

    @Field((type) => String, { nullable: true, description: '地址' })
    @IsString()
    @IsOptional()
    address?: string;

    @Field((type) => Int, { nullable: true, description: '租金' })
    @IsInt()
    @IsOptional()
    rent: number;

    @Field(() => CoordinateDTO, { nullable: true, description: '座標' })
    coordinates?: CoordinateDTO;

    @Field((type) => Int, { nullable: true, description: '用途' })
    @IsInt()
    @IsOptional()
    usage?: number;

    @Field((type) => Int, { nullable: true, description: '建築類型' })
    @IsInt()
    @Expose({ name: 'building_type' })
    @IsOptional()
    buildingType?: number;

    @Field((type) => Int, { nullable: true, description: '空間型態' })
    @IsInt()
    @Expose({ name: 'space_type' })
    @IsOptional()
    spaceType?: number;

    @Field((type) => String, { nullable: true, description: '物件樓層' })
    @IsString()
    @IsOptional()
    floor?: string;

    @Field((type) => String, { nullable: true, description: '總樓層' })
    @IsString()
    @Expose({ name: 'total_floor' })
    @IsOptional()
    totalFloor?: string;

    @Field((type) => Float, { nullable: true, description: '坪數(m2)' })
    @IsInt()
    @IsOptional()
    size?: number;

    @Field((type) => Int, { nullable: true, description: '房間數量' })
    @IsInt()
    @Expose({ name: 'room_count' })
    @IsOptional()
    roomCount?: number;

    @Field((type) => GraphQLJSONObject, { nullable: true, description: '格局' })
    @IsJSON()
    @IsOptional()
    layout?: Record<string, any>;
}

@ObjectType()
export class PaginatedEstateDTO extends Paginated(EstateResponseDTO) {}

@ObjectType()
export class MapInfoResponseDTO {
    @Field(() => [InfoResponseDTO], { nullable: true })
    info?: [InfoResponseDTO];

    @Field(() => PaginatedEstateDTO, { nullable: true })
    estates?: PaginatedEstateDTO;
}

@ArgsType()
export class PaginatedDTO {
    @Field((type) => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @Field((type) => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    offset?: number;

    @Field((type) => Int, { nullable: true })
    @IsOptional()
    @IsInt()
    @IsOptional()
    skip?: number;
}

@ObjectType()
export class OptionDTO {
    @Field((type) => Int, { nullable: false, description: '最低值' })
    @IsInt()
    min: number;

    @Field((type) => Int, { nullable: false, description: '最高值' })
    @IsInt()
    max: number;
}

@ObjectType()
export class SearchOptionsResponseDTO {
    @Field(() => OptionDTO, { nullable: false, description: '租金' })
    rent: OptionDTO;

    @Field(() => OptionDTO, { nullable: false, description: '面積' })
    size: OptionDTO;
}

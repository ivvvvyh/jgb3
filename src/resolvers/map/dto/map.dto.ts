import { ArgsType, Field, Int, InputType, ObjectType, Float } from '@nestjs/graphql';
import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
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
    country_id?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    city_id?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    district_id?: number;
}

@ObjectType()
export class AreaInput {
    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    country_id?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    city_id?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    district_id?: number;
}

@ObjectType()
export class InfoResponseDTO extends AreaInput {
    @Field(() => CoordinateDTO, { nullable: true, description: '座標' })
    coordinates?: CoordinateDTO;

    @Field((type) => Int)
    @IsInt()
    amount: number;
}

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

    @Field((type) => String, { nullable: true, description: '用途' })
    @IsString()
    @IsOptional()
    usage?: string;

    @Field((type) => String, { nullable: true, description: '建築類型' })
    @IsString()
    @IsOptional()
    building_type?: string;

    @Field((type) => Int, { nullable: true, description: '物件樓層' })
    @IsInt()
    @IsOptional()
    floor?: number;

    @Field((type) => Int, { nullable: true, description: '總樓層' })
    @IsInt()
    @IsOptional()
    total_floor?: number;

    @Field((type) => GraphQLJSONObject, { nullable: true, description: '坪數' })
    @IsJSON()
    @IsOptional()
    size?: Record<string, any>;

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
    @Field((type) => Int)
    @IsInt()
    @Min(1)
    page: number;

    @Field((type) => Int)
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    offset: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    skip?: number;
}

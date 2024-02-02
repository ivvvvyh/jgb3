import { ArgsType, Field, Int, InputType, ObjectType, Float } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type, Expose } from 'class-transformer';

@InputType()
export class CenterDTO {
    @Field({ nullable: false })
    @IsInt()
    @IsNotEmpty()
    latitude: number;

    @Field({ nullable: false })
    @IsInt()
    @IsNotEmpty()
    longitude: number;
}

@ObjectType()
export class CoordinateDTO {
    @Field(() => Float, { nullable: true })
    latitude: number;

    @Field(() => Float, { nullable: true })
    longitude: number;
}

@ArgsType()
export class GetMapInfoDTO {
    @Field((type) => Int)
    @IsInt()
    @IsNotEmpty()
    zoom: number;

    @Field(() => CenterDTO)
    @Type(() => CenterDTO)
    center: CenterDTO;

    @Field((type) => Int)
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
export class MapInfoResponseDTO {
    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    country_id: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    city_id?: number;

    @Field((type) => Int, { nullable: true })
    @IsInt()
    @IsOptional()
    district_id?: number;

    @Field(() => CoordinateDTO, { nullable: true })
    coordinates?: CoordinateDTO;

    @Field((type) => Int)
    @IsInt()
    amount: number;
}

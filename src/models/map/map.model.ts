import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MapInfo {
    @Field((type) => Int)
    country_id: number;

    @Field((type) => Int)
    city_id: number;

    @Field((type) => Int)
    district_id: number;

    @Field((type) => Int)
    amount: number;
}

import { Entity, Column, ManyToOne, JoinColumn, Point } from 'typeorm';
import { Country } from 'src/entity/countries.entity';
import { City } from 'src/entity/cities.entity';
import { District } from './districts.entity';
import { BaseEntity } from './base.entity';

@Entity('estate')
export class Estate extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
        comment: '物件名稱',
        nullable: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '地址',
        nullable: true,
    })
    address: string;

    @Column({
        type: 'geography',
        comment: '座標',
        spatialFeatureType: 'Point',
        srid: 4326, // SRID for WGS 84 (standard for GPS coordinates),
        nullable: true,
    })
    coordinates: Point;

    @Column({
        type: 'int2',
        comment: '用途(1:住宅、2:商用、3:車位)',
        nullable: true,
    })
    usage: number;

    @Column({
        type: 'int2',
        comment: '建築類型(1:大樓、2:公寓、3:透天厝、4:別墅、5:華夏、6:農舍)',
        nullable: true,
    })
    building_type: number;

    @Column({
        type: 'int',
        comment: '樓層',
        nullable: true,
    })
    floor: number;

    @Column({
        type: 'int',
        comment: '總樓層',
        nullable: true,
    })
    total_floor: number;

    @Column({
        type: 'float',
        comment: '坪數(m2)',
        nullable: true,
    })
    size: number;

    @Column({
        type: 'int',
        comment: '租金',
        nullable: true,
    })
    rent: number;

    @Column({
        type: 'json',
        comment: '圖片',
        nullable: true,
    })
    gallery: Record<string, any>[];

    @Column({
        type: 'int',
        comment: '房間數量',
        default: 0,
    })
    room_count: number;

    @Column({
        type: 'json',
        comment: '格局',
        default: () => '\'{"room": 0, "living_room": 0, "bathroom": 0, "kitchen": 0, "balcony": 0}\'',
    })
    layout: Record<string, any>[];

    @ManyToOne(() => Country, (country) => country.estate)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @ManyToOne(() => City, (city) => city.estate)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => District, (district) => district.estate)
    @JoinColumn({ name: 'district_id' })
    district: District;
}

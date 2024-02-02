import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Point } from 'typeorm';
import { Country } from 'src/entity/countries.entity';
import { City } from 'src/entity/cities.entity';
import { District } from './districts.entity';

@Entity('estate')
export class Estate {
    @PrimaryGeneratedColumn({
        comment: 'ID',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '物件名稱',
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '地址',
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
        type: 'varchar',
        length: 255,
        comment: '用途',
        nullable: true,
    })
    usage: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '建築類型',
        nullable: true,
    })
    building_type: string;

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
        type: 'json',
        comment: '坪數',
        default: () => '\'{"m2": 0, "sqm": 0, "sq_ft": 0}\'',
    })
    size: Record<string, any>;

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
        type: 'json',
        comment: '格局',
        default: () => '\'{"room": 0, "living_room": 0, "bathroom": 0, "kitchen": 0, "balcony": 0}\'',
    })
    layout: Record<string, any>[];

    @Column({
        type: 'timestamp',
        default: () => 'NOW()',
        comment: '建立時間',
    })
    created_at: Date;

    @Column({
        type: 'timestamp',
        default: () => 'NOW()',
        onUpdate: 'NOW()',
        comment: '更新時間',
    })
    updated_at: Date;

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

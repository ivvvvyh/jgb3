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

    @ManyToOne(() => Country, (country) => country.estate)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @ManyToOne(() => City, (city) => city.estate)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => District, (district) => district.estate)
    @JoinColumn({ name: 'district_id' })
    district: District;

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
}

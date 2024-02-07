import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Country } from 'src/entity/countries.entity';
import { Estate } from 'src/entity/estates.entity';
import { City } from './cities.entity';

@Entity('district')
export class District {
    @PrimaryGeneratedColumn({
        comment: 'ID',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        comment: '區域名稱',
    })
    name: string;

    @ManyToOne(() => Country, (country) => country.district)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @ManyToOne(() => City, (city) => city.district)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @OneToMany((type) => Estate, (estate) => estate.district)
    estate: Estate[];

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

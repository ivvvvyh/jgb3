import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Country } from 'src/entity/countries.entity';
import { Estate } from 'src/entity/estates.entity';
import { District } from './districts.entity';

@Entity('city')
export class City {
    @PrimaryGeneratedColumn({
        comment: 'ID',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        comment: '城市名稱',
        unique: true,
    })
    name: string;

    @ManyToOne(() => Country, (country) => country.city)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @OneToMany((type) => District, (district) => district.city)
    district: District[];

    @OneToMany((type) => Estate, (estate) => estate.city)
    estate: Estate[];

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { City } from 'src/entity/cities.entity';
import { Estate } from 'src/entity/estates.entity';
import { District } from './districts.entity';

@Entity('country')
export class Country {
    @PrimaryGeneratedColumn({
        comment: 'ID',
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        comment: '國家名稱',
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 10,
        comment: '國家字母代碼',
        unique: true,
        nullable: true,
    })
    code: string;

    @OneToMany((type) => City, (city) => city.country)
    city: City[];

    @OneToMany((type) => District, (district) => district.country)
    district: District[];

    @OneToMany((type) => Estate, (estate) => estate.country)
    estate: Estate[];

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

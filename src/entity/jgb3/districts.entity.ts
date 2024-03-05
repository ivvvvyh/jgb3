import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

    @Column({
        type: 'int',
        comment: '國家 ID',
        nullable: false,
    })
    country_id: number;

    @Column({
        type: 'int',
        comment: '城市 ID',
        nullable: false,
    })
    city_id: number;

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

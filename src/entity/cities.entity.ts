import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

    @Column({
        type: 'int',
        comment: '國家 ID',
        nullable: false,
    })
    country_id: number;

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

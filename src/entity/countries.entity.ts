import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

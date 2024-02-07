import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn({ comment: 'ID' })
    id: number;

    @UpdateDateColumn({ comment: '更新時間', onUpdate: 'NOW()' })
    updated_at: Date;

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

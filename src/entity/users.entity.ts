import { IsEmail } from 'class-validator';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({ comment: 'ID' })
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Email',
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '使用者密碼',
    })
    password: string;

    @UpdateDateColumn({ comment: '更新時間', onUpdate: 'NOW()' })
    updated_at: Date;

    @CreateDateColumn({ comment: '建立時間' })
    created_at: Date;
}

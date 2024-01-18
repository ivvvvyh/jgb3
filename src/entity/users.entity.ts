import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn({
        comment: 'ID',
    })
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

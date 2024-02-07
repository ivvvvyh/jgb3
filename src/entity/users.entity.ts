import { IsEmail } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class User extends BaseEntity {
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }

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
}

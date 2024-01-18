import { IsInt, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty({ description: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: '使用者密碼' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CreateUserDTO extends UserDTO {}

export class LoginResponseDTO {
    @ApiProperty({ description: 'Token' })
    @IsString()
    token: string;
}

export class UserInfoDTO {
    @ApiProperty({ description: 'ID' })
    @IsInt()
    @IsNotEmpty()
    @Expose()
    id: number;

    @ApiProperty({ description: 'email' })
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;
}

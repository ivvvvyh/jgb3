import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '12h' },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule as CacheManagerModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        CacheManagerModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('REDIS_HOST'),
                port: configService.get<number>('REDIS_PORT'),
                password: configService.get('REDIS_PASSWORD'),
            }),
        }),
    ],
    exports: [CacheModule],
})
export class CacheModule {}

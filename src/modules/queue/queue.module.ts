import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                redis: {
                    host: configService.get('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    password: configService.get('REDIS_PASSWORD'),
                },
            }),
        }),
        BullModule.registerQueue({ name: 'task' }),
    ],
    exports: [BullModule],
})
export class QueueModule {}

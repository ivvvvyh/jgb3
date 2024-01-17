import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
    controllers: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}

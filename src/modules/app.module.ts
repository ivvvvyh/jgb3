import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { TimeoutInterceptor } from 'src/common/interceptors/timeout.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DatabaseModule } from 'src/modules/database/database.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { CacheModule } from 'src/modules/database/cache.module';
import { HttpModule } from '@nestjs/axios';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MapModule } from 'src/modules/map/map.module';
import { AppLoggerMiddleware } from '../common/middlewars/logger.middleware';
import { CronjobsModule } from 'src/modules/cronjob/cronjobs.module';

@Module({
    imports: [AuthModule, UserModule, MapModule],
})
export class APIModule {}

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        CronjobsModule,
        ScheduleModule.forRoot(),
        DatabaseModule,
        CacheModule,
        HttpModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: true,
        }),
        APIModule,
    ],
    controllers: [],
    providers: [
        JwtService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppLoggerMiddleware).forRoutes('/');
    }
}

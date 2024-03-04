import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/data-source_3';
import { dataSourceOptions as mysqlDataSourceOption } from 'src/database/data-source_2';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({ name: 'jgb2', useFactory: () => mysqlDataSourceOption }),
        TypeOrmModule.forRootAsync({ name: 'jgb3', useFactory: () => dataSourceOptions }),
    ],
})
export class DatabaseModule {}

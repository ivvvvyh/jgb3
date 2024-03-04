import { Module } from '@nestjs/common';
import { MapResolver } from 'src/resolvers/map/map.resolver';
import { MapService } from 'src/services/map/map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estate } from 'src/entity/jgb3/estates.entity';
import { Country } from 'src/entity/jgb3/countries.entity';
import { City } from 'src/entity/jgb3/cities.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([Country, City, Estate], 'jgb3'), HttpModule],
    providers: [MapResolver, MapService],
})
export class MapModule {}

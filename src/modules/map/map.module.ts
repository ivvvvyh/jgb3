import { Module } from '@nestjs/common';
import { MapResolver } from 'src/resolvers/map/map.resolver';
import { MapService } from 'src/services/map/map.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estate } from 'src/entity/estates.entity';
import { Country } from 'src/entity/countries.entity';
import { City } from 'src/entity/cities.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([Country, City, Estate]), HttpModule],
    providers: [MapResolver, MapService],
})
export class MapModule {}

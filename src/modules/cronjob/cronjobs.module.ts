import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronjobsService } from 'src/cronjobs/cronjobs.service';
import { Estate as PreEstate } from 'src/entity/jgb2/estates.entity';
import { Estate } from 'src/entity/jgb3/estates.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PreEstate], 'jgb2'), TypeOrmModule.forFeature([Estate], 'jgb3')],
    providers: [CronjobsService],
})
export class CronjobsModule {}

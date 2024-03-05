import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronjobsService } from 'src/cronjobs/cronjobs.service';
import { Estate as PreEstate } from 'src/entity/jgb2/estates.entity';
import { Estate } from 'src/entity/jgb3/estates.entity';
import { QueueModule } from '../queue/queue.module';
import { SyncEstateConsumer } from 'src/cronjobs/jobs/syncEstate.processor';

@Module({
    imports: [QueueModule, TypeOrmModule.forFeature([PreEstate], 'jgb2'), TypeOrmModule.forFeature([Estate], 'jgb3')],
    providers: [CronjobsService, SyncEstateConsumer],
})
export class CronjobsModule {}

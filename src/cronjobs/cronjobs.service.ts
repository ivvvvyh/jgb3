import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class CronjobsService {
    constructor(@InjectQueue('task') private taskQueue: Queue) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async syncEstate() {
        await this.taskQueue.add('syncEstate');
    }
}

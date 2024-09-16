import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';

@Injectable()
export class DynamicCronService {
  startDynamicJob() {
    const job = new CronJob('*/10 * * * * *', () => {
      console.log('Dynamic cron job running every 10 seconds');
    });
    job.start();
  }
}

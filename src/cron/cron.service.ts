import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron('0 0 * * *') // Runs every day at midnight
  handleMidnightTask() {
    console.log('Midnight task running');
  }

  @Interval(60000) // Runs every 60 seconds
  handleIntervalTask() {
    console.log('Running interval task every 60 seconds');
  }

  @Timeout(5000) // Runs once, after 5 seconds
  handleTimeoutTask() {
    console.log('Timeout task running once after 5 seconds');
  }
}

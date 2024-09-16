import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { DynamicCronService } from './dynamic-cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService, DynamicCronService],
})
export class CronModule {}

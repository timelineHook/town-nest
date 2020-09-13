import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TechService } from 'src/tech/tech.service';

@Injectable()
export class ScheduleTasksService {

  constructor(
    private readonly techService: TechService
  ){}

  // 定时爬取数据
  @Cron(CronExpression.EVERY_HOUR )
  bugTechBrunch(): void {
    this.techService.bugTechCrunchData();
  }

  // 每周清空前一周数据
  @Cron(CronExpression.EVERY_WEEK)
  clearTechBrunch(): void {
    this.techService.clearTechBrunchData();
  }

}
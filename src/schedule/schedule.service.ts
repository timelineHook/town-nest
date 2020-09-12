import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TechService } from 'src/tech/tech.service';

@Injectable()
export class ScheduleTasksService {

  constructor(
    private readonly techService: TechService
  ){}

  @Cron('* 1 * * * * *')
  handleCron(): void {
    // this.techService.bugTechCrunchData();
  }
}
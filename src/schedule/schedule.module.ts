import { Module, HttpModule } from '@nestjs/common';
import { ScheduleTasksService } from './schedule.service';
import { TechService } from '@town/crawler.tech/tech.service';
import { TechModel } from '@town/town.util/model.core';

@Module({
  imports: [TechModel, HttpModule],
  providers: [ScheduleTasksService, TechService]
})
export class ScheduleTasksModule { }
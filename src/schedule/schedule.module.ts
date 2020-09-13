import { Module, HttpModule, Global } from '@nestjs/common';
import { ScheduleTasksService } from './schedule.service';
import { TechModule } from 'src/tech/tech.module';
import { TechService } from 'src/tech/tech.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TechCrunchSchema, TechCrunchSchemaFactory } from 'src/tech/techCrunch.schema';

@Global()
@Module({
  imports: [TechModule, MongooseModule.forFeature([{ name: TechCrunchSchema.name, schema: TechCrunchSchemaFactory, collection: 'techCrunch' }], 'techCrunch'), HttpModule],
  providers: [ScheduleTasksService, TechService],
  exports: []
})
export class ScheduleTasksModule { }
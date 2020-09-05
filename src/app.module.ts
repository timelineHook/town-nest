import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksModule } from './schedule/schedule.module';
import { TechUtilModule } from './util/util.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middleware/log.middleware';

@Global()
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/techCrunch', {
    //   user: 'zhangzw',
    //   pass: 'zhangzw',
    //   connectionName: 'techCrunch',
    // }),
    MongooseModule.forRoot('mongodb+srv://zhangzw:zhangzw@cluster0.xojkz.mongodb.net/user?retryWrites=true&w=majority', {
      connectionName: 'techCrunch'
    }),
    ScheduleModule.forRoot(),
    ScheduleTasksModule,
    TechUtilModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

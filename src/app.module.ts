import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksModule } from './schedule/schedule.module';
import { TechUtilModule } from './util/util.module';
import { LoggerMiddleware } from './middleware/log.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonInterceptor } from './interceptor/winston.logger.interceptor';

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
    TechUtilModule
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: WinstonInterceptor
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

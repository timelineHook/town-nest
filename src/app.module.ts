import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule';
import { TechModule } from '@town/crawler.tech/tech.module';
import { UtilModule } from '@town/town.util/util.module';
import { LoggerMiddleware } from '@town/middleware/log.middleware';
import { ScheduleTasksModule } from '@town/schedule/schedule.module';
import { WinstonInterceptor } from '@town/interceptor/winston.logger.interceptor';
import { UserModule } from '@town/town.user/user.module';
import { AuthModule } from '@town/town.auth/auth.module';
import { mongodb_config } from '@town/application/constant';
import { AdminModule } from './town.admin/admin.module';
import { AllExceptionsFilter } from './filter/town.exception';

@Module({
  imports: [
    MongooseModule.forRoot(mongodb_config.nest_master.url),
    // MongooseModule.forRoot(mongodb_config.nest_master.url, {
    //   connectionName: mongodb_config.nest_master.name
    // }),
    // MongooseModule.forRoot(mongodb_config.nest_admin.url, {
    //   connectionName: mongodb_config.nest_admin.name
    // }),
    ScheduleModule.forRoot(),
    ScheduleTasksModule,
    UtilModule,
    HttpModule,
    AdminModule,

    AuthModule,
    TechModule,
    UserModule
  ],
  controllers: [],
  providers: [
    {
      // 挂载管局winston日志
      provide: APP_INTERCEPTOR,
      useClass: WinstonInterceptor
    },
    {
      // 挂载全局异常过滤器
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

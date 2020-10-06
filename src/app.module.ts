import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod, HttpModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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

@Module({
  imports: [
    MongooseModule.forRoot(mongodb_config.url),
    ScheduleModule.forRoot(),
    ScheduleTasksModule,
    UtilModule,
    HttpModule,

    AuthModule,
    TechModule,
    UserModule
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

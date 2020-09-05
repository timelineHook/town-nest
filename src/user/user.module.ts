import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { LoggerMiddleware } from 'src/middleware/log.middleware';

@Module({
  imports: [LoggerMiddleware],
  controllers: [UserController],
  providers: [UserService],
  exports: []
})
export class UserModule implements NestModule {
  configure(user: MiddlewareConsumer): void {
    user
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user/addUser', method: RequestMethod.POST });
  }
}

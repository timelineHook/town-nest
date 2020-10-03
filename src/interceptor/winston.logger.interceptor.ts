import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logger } from '@town/middleware/winston.middleware';

/**
 * @description winston 日志拦截器 用于返回数据
 */
@Injectable()
export class WinstonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          logger.info(`response data: ${JSON.stringify(data)}`);
          return { success: true, code: 200, data };
        })
      );
  }
}

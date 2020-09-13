import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {logger} from '../middleware/winston.middleware'

@Injectable()
export class WinstonInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          logger.info(`response data: ${JSON.stringify(data)}`);
          return data;
        })
      );
  }
}

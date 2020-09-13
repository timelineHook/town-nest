import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from './winston.middleware';
import * as rTracer from 'cls-rtracer';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function): Promise<any> {
    logger.info(` request  [-/${req.ip}/${rTracer.id()} ${req.method} ${req.url}]`);
    await next();
  }
}

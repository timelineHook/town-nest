import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from './winston.middleware';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function): Promise<any> {

    const condition = {
      GET: req.query,
      POST: req.body,
      PUT: {...req.body, ...req.query},
      DELETE: req.query
    };

    logger.info(` request - ${req.ip} ${req.method} ${req.originalUrl} ${JSON.stringify(condition[req.method])}`);
    await next();
  }
}

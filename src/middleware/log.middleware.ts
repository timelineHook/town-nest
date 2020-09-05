import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';
import { UtilService } from 'src/util/util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
  constructor(
    private readonly logger: LoggerService,
    private readonly util: UtilService
  ){}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async use(req: Request, res: Response, next: Function): Promise<any> {
    this.logger.log(` get request  [ ${this.util.getRandomUUID()} - ${req.ip} ${req.method} - ${req.url} - ${req.headers.requ} ]`);
    await next();
    this.logger.log(`response [ ${this.util.getRandomUUID()} ]`);
  }
}

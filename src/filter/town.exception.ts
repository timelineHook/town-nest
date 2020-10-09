import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { logger } from '@town/middleware/winston.middleware';

// 全局异常捕获过滤器
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: { code: number, message: string, message_en: string, stack: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = {
      code: exception?.code,
      message: exception?.message,
      message_en: exception?.message_en
    };
    logger.error(exception?.stack);
    response.json(message);
  }
}

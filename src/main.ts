import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as compression from 'compression';
import * as rTracer from 'cls-rtracer';
import { logger } from './middleware/winston.middleware';
import { HttpExceptionFilter } from './filter/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀
  app.setGlobalPrefix('town');

  // 加载winston日志中间件
  app.useLogger(logger);

  // tracid
  app.use(rTracer.expressMiddleware());

  // 常见web浏览攻击保护
  app.use(helmet());

  // 压缩响应主体大小
  app.use(compression());

  // CORS中间件
  app.enableCors({ origin: true });

  // CSRF 或 XSRF 恶意攻击
  // app.use(csurf({}));

  // 守卫
  app.useGlobalPipes(new ValidationPipe());

  // 全局异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000, () => {
    logger.info('listen 3000 success', 'town-nest');
  }).catch((e: Error) => {
    logger.error(`start nest pro bug fail ${ e.message}`);
  });
}
bootstrap();

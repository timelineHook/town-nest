import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new LoggerService();

  // 守卫
  app.useGlobalPipes(new ValidationPipe());

  // 日志
  app.useLogger(logger);

  await app.listen(3000, () => {
    logger.info('listen 3000 success', 'next-pro-bug');
  }).catch((e: Error)=>{
    logger.error('start nest pro bug fail', e.message);
  });
}
bootstrap();

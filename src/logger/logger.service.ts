import { Logger } from '@nestjs/common';

export class LoggerService extends Logger {
  error(message: string, trace: string): void {
    // add your tailored logic here
    super.error(message, trace);
  }

  info(message: string, trace: string): void {
    // add your tailored logic here
    super.log(message, trace);
  }
}
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  // constructor(private readonly logger: Logger) {
  //   this.logger = new Logger(AppService.name);
  // }

  getHello(): string {
    this.logger.debug(process.env.PROD);
    return 'Hello World!';
  }
}

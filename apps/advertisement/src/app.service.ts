import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);

  constructor(private eventEmitter: EventEmitter2) {}

  getHello(): string {
    this.logger.debug('Hello World!');
    this.eventEmitter.emit('test', 123);
    return 'Hello World! HELL';
  }
}

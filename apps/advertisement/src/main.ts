import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { middlewares } from './app.middlewares';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: process.env.NODE_ENV
    //   ? ['error']
    //   : ['warn'],
  });
  middlewares(app);
  const config: ConfigService = app.get(ConfigService);
  await app.listen(config.get('port'), () => {
    Logger.debug('server start', 'main');
  });
}
bootstrap();

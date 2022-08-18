import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: process.env.NODE_ENV
    //   ? ['error']
    //   : ['warn'],
  });
  const config: ConfigService = app.get(ConfigService);
  await app.listen(config.get('port'));
}
bootstrap();

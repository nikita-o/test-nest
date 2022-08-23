import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { middlewares } from './app.middlewares';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: process.env.NODE_ENV
    //   ? ['error']
    //   : ['warn'],
  });
  middlewares(app);

  const configSwagger = new DocumentBuilder()
    .setTitle('Advertisement')
    .setDescription('Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api_docs', app, document);

  const config: ConfigService = app.get(ConfigService);
  await app.listen(config.get('port'), () => {
    Logger.debug('server start', 'main');
  });
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import * as compression from 'compression';
import helmet from 'helmet';

export function middlewares(app: INestApplication): INestApplication {
  // типо для ускорения работы сервера, сжимается тело ответа
  app.use(compression());

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // типо для безопасности
  app.use(helmet());
  return app;
}

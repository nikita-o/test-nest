import { INestApplication } from '@nestjs/common';
import * as passport from 'passport';
import * as session from 'express-session';
import helmet from 'helmet';

export function middlewares(app: INestApplication): INestApplication {
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // типо для безопасности, если чет будет не работать, закоменть
  app.use(helmet());
  return app;
}

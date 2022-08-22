import { PassportSerializer } from '@nestjs/passport';
import { User } from '../database/schemas/user.schema';
import { Payload } from './auth.interface';
import { Injectable } from '@nestjs/common';

type Done = (err: Error, user: User | Payload) => void;

@Injectable()
export class AuthSerializer extends PassportSerializer {
  serializeUser(user: User, done: Done): any {
    done(null, user);
  }

  deserializeUser(payload: Payload, done: Done): any {
    done(null, payload);
  }
}

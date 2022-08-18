import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { Payload } from '../auth.interface';
import { UserDocument } from '../../schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Payload> {
    const user: UserDocument = <UserDocument>(
      await this.auth.validateUser(username, password)
    );
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }
    return { userId: user.id, username: user.name };
  }
}

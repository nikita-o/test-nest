import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { User } from '../database/schemas/user.schema';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { getHash } from '../common/utils/hash';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    this.logger.debug('validateUser');
    const user: User = await this.userService.findByEmail(email);
    const passwordHash = getHash(password);
    if (user && user.passwordHash === passwordHash) {
      delete user.passwordHash;
      return user;
    }
    return null;
  }

  async registration(data: CreateUserDto): Promise<void> {
    this.logger.debug('registration');
    // maybe there will be some processing
    await this.userService.create(data);
  }
}

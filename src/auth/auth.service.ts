import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { User } from '../schemas/user.schema';
import { createHash } from 'crypto';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User = await this.userService.findByEmail(email);
    const passwordHash = createHash('md5').update(password).digest('hex');
    if (user && user.passwordHash === passwordHash) {
      //const { passwordHash, ...result } = user;
      return user;
    }
    return null;
  }

  async registration(data: CreateUserDto): Promise<void> {
    // maybe there will be some processing
    await this.userService.create(data);
  }
}

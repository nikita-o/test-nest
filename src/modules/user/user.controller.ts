import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findById(@Param() id: string): Promise<User> {
    return await this.userService.findById(id);
  }
}

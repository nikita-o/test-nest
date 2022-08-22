import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../modules/user/dto/createUser.dto';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() data: CreateUserDto): Promise<void> {
    return this.authService.registration(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: any) {
    return req.user;
  }

  @UseGuards(AuthorizationGuard)
  @Get('check')
  checkAuth() {
    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private readonly logger: Logger = new Logger(AuthorizationGuard.name);
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug('canActivate');

    // Здесь можно чекать роли и всякие права доступа
    // Но мне тупо надо чекнуть пользователя

    const req = context.switchToHttp().getRequest();
    return req.isAuthenticated();
  }
}

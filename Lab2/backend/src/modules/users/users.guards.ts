import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './user.types';
import { ALLOW_SAME_USER, ROLES_KEY } from './users.decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isSameUserAllowed = this.reflector.getAllAndOverride<boolean>(
      ALLOW_SAME_USER,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const isSameUser = user?.sub === context.getArgs()[0].params.id;
    const isRoleAllowed = this.matchRoles(requiredRoles, user.role);

    const isAllowed = isRoleAllowed || (isSameUserAllowed && isSameUser);
    return isAllowed;
  }

  matchRoles(requiredRoles: UserRole[], userRole: UserRole) {
    return requiredRoles.some((role) => userRole?.includes(role));
  }
}

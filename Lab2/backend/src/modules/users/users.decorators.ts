import { SetMetadata } from '@nestjs/common';
import { UserRole } from './user.types';

export const ROLES_KEY = 'roles';
export const ALLOW_SAME_USER = 'allowSameUser';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
export const AllowSameUser = () => SetMetadata(ALLOW_SAME_USER, true);

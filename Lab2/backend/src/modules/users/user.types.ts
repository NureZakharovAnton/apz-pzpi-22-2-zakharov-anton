import { HydratedDocument } from 'mongoose';
import { User } from './user.entity';
import { USER_ROLES } from './user.constants';

export type UserDocument = HydratedDocument<User>;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

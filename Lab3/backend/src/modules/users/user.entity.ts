import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from './user.types';
import { USER_ROLES_VALUES } from './user.constants';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: USER_ROLES_VALUES })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

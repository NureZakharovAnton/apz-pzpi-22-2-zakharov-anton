import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

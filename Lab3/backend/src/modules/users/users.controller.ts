import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { AllowSameUser, Roles } from './users.decorators';
import { USER_ROLES } from './user.constants';
import { MailService } from '../mail/mail.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Delete('me')
  async deleteProfile(@Request() req) {
    const id = req.user?.sub;
    const result = await this.userService.deleteById(id);

    this.mailService.sendAccountDeletionEmail({
      email: result.email,
      name: result.name,
    });

    return result;
  }

  @Roles(USER_ROLES.ADMIN)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Roles(USER_ROLES.ADMIN)
  @AllowSameUser()
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateById(id, body);
  }
}

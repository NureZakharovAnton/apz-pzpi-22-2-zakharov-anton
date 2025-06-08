import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/users.dto';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { Public } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const result = await this.authService.register(body);

    this.mailService.sendWelcomeEmail({
      email: body.email,
      name: body.name,
    });

    return result;
  }
}

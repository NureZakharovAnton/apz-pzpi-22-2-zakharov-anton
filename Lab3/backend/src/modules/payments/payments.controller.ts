import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Roles } from '../users/users.decorators';
import { USER_ROLES } from '../users/user.constants';
import { MailService } from '../mail/mail.service';
import { User } from '../users/user.entity';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './payments.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly mailService: MailService,
  ) {}

  @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
  @Post()
  async create(@Body() body: CreatePaymentDto) {
    const payment = await this.paymentService.create(body);
    await payment.populate('user');
    const user = payment.user as unknown as User;

    this.mailService.sendInvoiceEmail({
      email: user.email,
      name: user.name,
      amount: payment.amount,
      invoiceNumber: payment.id,
    });

    return payment;
  }

  @Roles(USER_ROLES.ADMIN)
  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.paymentService.findById(id);
  }
}

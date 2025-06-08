import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './payments.dto';
import { Payment } from './payment.entity';
import { PaymentDocument } from './payment.types';
import { PAYMENT_STATUSES } from './payment.constants';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const createdPayment = await this.paymentModel.create({
      ...createPaymentDto,
      status: PAYMENT_STATUSES.SUCCESS,
    });
    return createdPayment;
  }

  async findAll() {
    return this.paymentModel.find().populate(['job', 'user']).exec();
  }

  async findById(id: string) {
    return this.paymentModel.findById(id).populate(['job', 'user']).exec();
  }
}

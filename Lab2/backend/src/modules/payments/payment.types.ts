import { HydratedDocument } from 'mongoose';
import { Payment } from './payment.entity';
import { PAYMENT_STATUSES } from './payment.constants';

export type PaymentDocument = HydratedDocument<Payment>;
export type PaymentStatus =
  (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];

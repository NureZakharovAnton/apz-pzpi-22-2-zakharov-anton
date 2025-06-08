import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';
import { PaymentStatus } from './payment.types';
import { PAYMENT_STATUSES_VALUES } from './payment.constants';

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  job: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: PAYMENT_STATUSES_VALUES })
  status: PaymentStatus;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

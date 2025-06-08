import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  job: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  reviewer: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  reviewee: Types.ObjectId;

  @Prop({ required: true })
  rating: number;

  @Prop()
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

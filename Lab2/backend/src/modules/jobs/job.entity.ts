import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../users/user.entity';
import { JobAttempt } from '../job-attempts/job-attempt.entity';

export type JobDocument = HydratedDocument<Job>;
export type JobStatus = 'inProgress' | 'completed' | 'failed';

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, })
  creator: Types.ObjectId;

  @Prop({ required: true })
  status: JobStatus;

  @Prop({
    type: [{ type: Types.ObjectId, ref: JobAttempt.name }],
    required: true,
  })
  attempts: Types.ObjectId[];
}

export const JobSchema = SchemaFactory.createForClass(Job);

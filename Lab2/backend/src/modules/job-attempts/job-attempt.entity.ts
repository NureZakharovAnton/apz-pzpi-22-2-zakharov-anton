import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Job } from '../jobs/job.entity';
import { JobAttemptStatus } from './job-attempt.types';
import { JOB_ATTEMPT_STATUSES_VALUES } from './job-attempt.constants';
import {
  JobAttemptAssignee,
  JobAttemptAssigneeSchema,
} from './schemas/job-attempt-assignee.entity';

@Schema({ timestamps: true, collection: 'jobAttempts' })
export class JobAttempt {
  @Prop({ required: true, enum: JOB_ATTEMPT_STATUSES_VALUES })
  status: JobAttemptStatus;

  @Prop({ type: [JobAttemptAssigneeSchema], default: [] })
  assignees: JobAttemptAssignee[];
}

export const JobAttemptSchema = SchemaFactory.createForClass(JobAttempt);

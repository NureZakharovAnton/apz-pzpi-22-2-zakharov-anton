import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from '../../users/user.entity';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export type JobAttemptAssigneeStatus =
  (typeof JOB_ATTEMPT_ASSIGNEE_STATUSES)[keyof typeof JOB_ATTEMPT_ASSIGNEE_STATUSES];

export const JOB_ATTEMPT_ASSIGNEE_STATUSES = Object.freeze({
  IN_PROGRESS: 'inProgress',
  SUCCESS: 'success',
  FAILED: 'failed',
});

export const JOB_ATTEMPT_ASSIGNEE_STATUSES_VALUES = Object.values(
  JOB_ATTEMPT_ASSIGNEE_STATUSES,
);

export class CreateJobAttemptAssigneeDto {
  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(JOB_ATTEMPT_ASSIGNEE_STATUSES_VALUES)
  readonly status: JobAttemptAssigneeStatus;
}

@Schema({ timestamps: true })
export class JobAttemptAssignee {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true, enum: JOB_ATTEMPT_ASSIGNEE_STATUSES_VALUES })
  status: JobAttemptAssigneeStatus;
}

export const JobAttemptAssigneeSchema =
  SchemaFactory.createForClass(JobAttemptAssignee);

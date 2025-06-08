import { HydratedDocument } from 'mongoose';
import { JobAttempt } from './job-attempt.entity';
import { JOB_ATTEMPT_STATUSES } from './job-attempt.constants';

export type JobAttemptDocument = HydratedDocument<JobAttempt>;
export type JobAttemptStatus =
  (typeof JOB_ATTEMPT_STATUSES)[keyof typeof JOB_ATTEMPT_STATUSES];

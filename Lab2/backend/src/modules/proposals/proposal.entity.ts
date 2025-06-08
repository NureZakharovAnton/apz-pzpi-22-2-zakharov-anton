import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Job } from '../jobs/job.entity';
import { User } from '../users/user.entity';
import { PROPOSAL_STATUSES_VALUES } from './proposal.constants';
import { ProposalStatus } from './proposal.types';

@Schema({ timestamps: true })
export class Proposal {
  @Prop({ type: Types.ObjectId, ref: Job.name, required: true })
  job: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true, enum: PROPOSAL_STATUSES_VALUES })
  status: ProposalStatus;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);

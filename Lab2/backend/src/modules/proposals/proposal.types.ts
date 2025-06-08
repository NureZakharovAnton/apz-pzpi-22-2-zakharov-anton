import { HydratedDocument } from 'mongoose';
import { PROPOSAL_STATUSES } from './proposal.constants';
import { Proposal } from './proposal.entity';

export type ProposalDocument = HydratedDocument<Proposal>;
export type ProposalStatus =
  (typeof PROPOSAL_STATUSES)[keyof typeof PROPOSAL_STATUSES];

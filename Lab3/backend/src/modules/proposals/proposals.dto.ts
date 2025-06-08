import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { PROPOSAL_STATUSES_VALUES } from './proposal.constants';
import { ProposalStatus } from './proposal.types';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(PROPOSAL_STATUSES_VALUES)
  readonly status: ProposalStatus;
}

export class UpdateProposalDto {
  @IsString()
  @IsOptional()
  readonly job: string;

  @IsString()
  @IsOptional()
  readonly user: string;

  @IsString()
  @IsOptional()
  readonly text: string;

  @IsString()
  @IsOptional()
  @IsIn(PROPOSAL_STATUSES_VALUES)
  readonly status: ProposalStatus;
}

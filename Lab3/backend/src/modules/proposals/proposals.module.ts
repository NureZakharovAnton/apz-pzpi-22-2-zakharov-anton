import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { Proposal, ProposalSchema } from './proposal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proposal.name, schema: ProposalSchema },
    ]),
  ],
  providers: [ProposalsService],
  controllers: [ProposalsController],
  exports: [ProposalsService],
})
export class ProposalsModule {}

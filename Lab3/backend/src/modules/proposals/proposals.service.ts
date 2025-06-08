import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './proposal.entity';
import { CreateProposalDto } from './proposals.dto';
import { ProposalDocument } from './proposal.types';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
  ) {}

  async create(createProposalDto: CreateProposalDto) {
    const createdProposal = await this.proposalModel.create(createProposalDto);
    return createdProposal;
  }

  async findAll() {
    return this.proposalModel.find().populate(['job', 'user']).exec();
  }

  async findById(id: string) {
    return this.proposalModel.findById(id).populate(['job', 'user']).exec();
  }

  async updateById(id: string, updateProposalDto: CreateProposalDto) {
    return this.proposalModel
      .findByIdAndUpdate(id, updateProposalDto, { new: true })
      .populate(['job', 'user'])
      .exec();
  }

  async deleteById(id: string) {
    return this.proposalModel.findByIdAndDelete(id).exec();
  }
}

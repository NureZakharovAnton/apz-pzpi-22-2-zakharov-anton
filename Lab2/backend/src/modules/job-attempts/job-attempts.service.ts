import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobAttempt } from './job-attempt.entity';
import { JobAttemptDocument } from './job-attempt.types';
import { CreateJobAttemptDto, UpdateJobAttemptDto } from './job-attempts.dto';

@Injectable()
export class JobAttemptsService {
  constructor(
    @InjectModel(JobAttempt.name)
    private jobAttemptModel: Model<JobAttemptDocument>,
  ) {}

  async create(createJobAttemptDto: CreateJobAttemptDto) {
    const createdJobAttempt =
      await this.jobAttemptModel.create(createJobAttemptDto);

    return createdJobAttempt;
  }

  async findAll() {
    return this.jobAttemptModel.find().exec();
  }

  async findByJobId(jobId: string) {
    return await this.jobAttemptModel.find({ job: jobId }).exec();
  }

  async findById(id: string) {
    return this.jobAttemptModel.findById(id).exec();
  }

  async updateById(id: string, updateJobAttemptDto: UpdateJobAttemptDto) {
    return this.jobAttemptModel
      .findByIdAndUpdate(id, updateJobAttemptDto, { new: true })
      .exec();
  }

  async deleteById(id: string) {
    return this.jobAttemptModel.findByIdAndDelete(id).exec();
  }
}

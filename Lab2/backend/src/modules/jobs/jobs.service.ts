import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Job, JobDocument } from './job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateJobDto, UpdateJobDto } from './jobs.dto';
import { JobAttempt } from '../job-attempts/job-attempt.entity';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto) {
    const newJob = this.jobModel.create(createJobDto);
    return newJob;
  }

  async findAll({ userId }: { userId: string }) {
    const filters = {};
    if (userId) {
      filters['creator'] = userId;
    }

    const jobs = await this.jobModel
    .find(filters)
    .populate({
      path: 'attempts',
      model: JobAttempt.name,
    })

    return jobs;
  }

  async findById(id: string) {
    const job = await this.jobModel.findById(id).exec();
    return job;
  }

  async updateById(id: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobModel.findOneAndUpdate(
      { _id: id },
      updateJobDto,
      {
        new: true,
      },
    );
    return job;
  }

  async addAttempt(jobId: string, attemptId: Types.ObjectId) {
    const job = await this.jobModel.findOneAndUpdate(
      { _id: jobId },
      { $push: { attempts: attemptId } },
      { new: true },
    );

    return job;
  }

  async deleteById(id: string) {
    const job = await this.jobModel.findOneAndDelete({ _id: id });
    return job;
  }
}

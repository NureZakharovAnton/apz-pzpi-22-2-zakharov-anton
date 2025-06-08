import { Module } from '@nestjs/common';
import { JobAttemptsModule } from '../job-attempts/job-attempts.module';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './job.entity';
import { JobsService } from './jobs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
    JobAttemptsModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}

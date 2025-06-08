import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { CreateJobAttemptAssigneeDto } from './schemas/job-attempt-assignee.entity';

export class CreateJobAttemptDto {
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobAttemptAssigneeDto)
  readonly assignees: CreateJobAttemptAssigneeDto[];
}

export class UpdateJobAttemptDto {
  @IsString()
  @IsOptional()
  readonly status: string;
}

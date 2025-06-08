import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  creator: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  creator?: string;
}

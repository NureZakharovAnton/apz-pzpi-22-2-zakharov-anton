import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewer: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewee: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsOptional()
  readonly comment?: string;
}

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  readonly job?: string;

  @IsString()
  @IsOptional()
  readonly reviewer?: string;

  @IsString()
  @IsOptional()
  readonly reviewee?: string;

  @IsNumber()
  @IsOptional()
  readonly rating?: number;

  @IsString()
  @IsOptional()
  readonly comment?: string;
}

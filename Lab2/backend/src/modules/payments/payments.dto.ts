import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}

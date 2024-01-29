import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating?: number;

  @IsString()
  review?: string;
}

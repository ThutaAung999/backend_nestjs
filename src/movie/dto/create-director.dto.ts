import { IsNumber, IsString } from 'class-validator';

export class CreateDirectorDto {
  @IsString()
  name?: string;

  @IsString()
  gender?: string;

  @IsString()
  address?: string;
}

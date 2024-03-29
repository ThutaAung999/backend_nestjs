import { IsNumber, IsString } from 'class-validator';

export class CreateActorDto {
  @IsString()
  name?: string;

  @IsString()
  gender?: string;
}

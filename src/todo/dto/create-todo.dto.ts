import * as Joi from 'joi';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title?: string;

  @IsBoolean()
  completed?: boolean;
}

export const CreateTodoSchema = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().min(3).max(255).required(),
}).options({
  abortEarly: false,
});

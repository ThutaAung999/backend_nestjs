import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { CreateTodoDto } from '../../todo/dto/create-todo.dto';
import { Todo } from '../../schemas/todo.schema';
import { Actor, ActorDocument } from '../../schemas/actor.schema';
import { CreateActorDto } from '../dto/create-actor.dto';
import { UpdateActorDto } from '../dto/update-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectModel(Actor.name) private actorModel: Model<ActorDocument>,
  ) {}

  async findAll() {
    return await this.actorModel.find().exec();
  }

  async findOne(id: string) {
    return this.actorModel.findById(id).exec();
  }

  async create(createActorDto: CreateActorDto) {
    console.log('Actor :  ', createActorDto);

    const createdActor = new this.actorModel(createActorDto);
    return createdActor.save();
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    return this.actorModel.findByIdAndUpdate(id, updateActorDto, { new: true });
  }

  async remove(id: string) {
    return this.actorModel.findByIdAndDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Director, DirectorDocument } from '../../schemas/director.schema';
import { CreateDirectorDto } from '../dto/create-director.dto';
import { UpdateDirectorDto } from '../dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}

  async findAll() {
    return await this.directorModel.find().exec();
  }

  async findOne(id: string) {
    return this.directorModel.findById(id).exec();
  }

  async create(createDirectorDto: CreateDirectorDto) {
    console.log('DireActor :  ', createDirectorDto);

    const createdDirector = new this.directorModel(createDirectorDto);
    return createdDirector.save();
  }

  async update(id: string, updateDirectorDto: UpdateDirectorDto) {
    return this.directorModel.findByIdAndUpdate(id, updateDirectorDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.directorModel.findByIdAndDelete(id);
  }
}

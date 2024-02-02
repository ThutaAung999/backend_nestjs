import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { CreateMovieDto } from '../movie/dto/create-movie.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    console.log('User :  ', createUserDto);

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUser(query: object) {
    return this.userModel.findOne(query);
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from '../schemas/movie.schema';
import { Model } from 'mongoose';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    console.log('Movie :  ', createMovieDto);

    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async findAll() {
    return await this.movieModel
      .find()
      //.populate('actors')
      //.populate('directors')
      //.populate('reviews')
      .exec();
  }

  async findOne(id: string) {
    return (
      this.movieModel
        .findById(id)
        .populate('actors')
        .populate('directors')
        //.populate('reviews')
        .exec()
    );
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true });
  }

  async remove(id: string) {
    return this.movieModel.findByIdAndDelete(id);
  }
}

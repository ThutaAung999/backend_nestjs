import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Review, ReviewDocument } from '../../schemas/review.schema';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async findAll() {
    return await this.reviewModel.find().exec();
  }

  async findOne(id: string) {
    return this.reviewModel.findById(id).exec();
  }

  async create(createReviewDto: CreateReviewDto) {
    console.log('Review :  ', createReviewDto);

    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel.findByIdAndUpdate(id, updateReviewDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
import { Review, ReviewDocument } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const createdReview = await this.reviewModel.create(createReviewDto);
    return createdReview;
  }

  async findAll() {
    return this.reviewModel.find().populate(['reviewer', 'reviewee']).exec();
  }

  async findById(id: string) {
    return this.reviewModel
      .findById(id)
      .populate(['reviewer', 'reviewee'])
      .exec();
  }

  async updateById(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .populate(['reviewer', 'reviewee'])
      .exec();
  }

  async deleteById(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() body: CreateReviewDto) {
    return this.reviewsService.create(body);
  }

  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateReviewDto) {
    return this.reviewsService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.reviewsService.deleteById(id);
  }
}

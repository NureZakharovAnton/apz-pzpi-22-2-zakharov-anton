import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';

const mockReview = {
  _id: '640c14e5b5f4ee1234567890',
  job: '640c14e5b5f4ee1234567891',
  reviewer: '640c14e5b5f4ee1234567892',
  reviewee: '640c14e5b5f4ee1234567893',
  rating: 5,
  comment: 'Great job!',
  createdAt: new Date(),
  updatedAt: new Date(),
  save: jest.fn().mockResolvedValue(this),
};

const mockReviewModel = {
  create: jest.fn().mockResolvedValue(mockReview),
  find: jest.fn().mockReturnValue({
    populate: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockReview]),
    }),
  }),
  save: jest.fn(),
};

describe('ReviewService', () => {
  let service: ReviewsService;
  let model: Model<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review.name),
          useValue: mockReviewModel,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    model = module.get<Model<Review>>(getModelToken(Review.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const reviewDto = {
        job: '640c14e5b5f4ee1234567891',
        reviewer: '640c14e5b5f4ee1234567892',
        reviewee: '640c14e5b5f4ee1234567893',
        rating: 5,
        comment: 'Great job!',
      };
      const result = await service.create(reviewDto);

      expect(mockReviewModel.create).toHaveBeenCalledWith(reviewDto);
      expect(result).toEqual(mockReview);
    });
  });

  describe('findAll', () => {
    it('should return an array of reviews', async () => {
      const result = await service.findAll();

      expect(mockReviewModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockReview]);
    });
  });
});

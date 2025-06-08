import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

const mockReview = {
  id: '123',
  job: '456',
  reviewer: '789',
  reviewee: '101112',
  rating: 5,
  comment: 'Great job!',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReviewController', () => {
  let controller: ReviewsController;
  let reviewService: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockReview),
            findAll: jest.fn().mockResolvedValue([mockReview]),
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call ReviewService.create and return the created review', async () => {
      const dto = {
        job: '456',
        reviewer: '789',
        reviewee: '101112',
        rating: 5,
        comment: 'Great job!',
      };
      const result = await controller.create(dto);

      expect(reviewService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockReview);
    });
  });

  describe('findAll', () => {
    it('should call ReviewService.findAll and return an array of reviews', async () => {
      const result = await controller.findAll();

      expect(reviewService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockReview]);
    });
  });
});

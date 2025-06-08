import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { getModelToken } from '@nestjs/mongoose';
import { Job } from './job.entity';
import { Model } from 'mongoose';

const mockJob = {
  _id: '640c14e5b5f4ee1234567890',
  name: 'Test',
  description: 'Test',
  creator: '640c14e5b',
  createdAt: new Date(),
  updatedAt: new Date(),
  save: jest.fn().mockResolvedValue(this),
};

const mockJobModel = {
  create: jest.fn().mockResolvedValue(mockJob),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockJob]),
  }),
  save: jest.fn(),
};

describe('JobsService', () => {
  let service: JobsService;
  let model: Model<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: getModelToken(Job.name),
          useValue: mockJobModel,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    model = module.get<Model<Job>>(getModelToken(Job.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const jobDto = {
        name: 'Test',
        description: 'test',
        price: 100,
        creator: '640c14e5b',
      };
      const result = await service.create(jobDto);

      expect(mockJobModel.create).toHaveBeenCalledWith(jobDto);
      expect(result).toEqual(mockJob);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      const result = await service.findAll();

      expect(mockJobModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockJob]);
    });
  });
});

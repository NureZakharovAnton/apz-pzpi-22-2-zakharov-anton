import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { USER_ROLES } from './user.constants';

const mockUser = {
  _id: '640c14e5b5f4ee1234567890',
  name: 'John Doe',
  email: 'john@example.com',
  role: USER_ROLES.CUSTOMER,
  createdAt: new Date(),
  updatedAt: new Date(),
  save: jest.fn().mockResolvedValue(this),
};

const mockUserModel = {
  create: jest.fn().mockResolvedValue(mockUser),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockUser]),
  }),
  save: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: USER_ROLES.CUSTOMER,
      };
      const result = await service.create(userDto);

      expect(mockUserModel.create).toHaveBeenCalledWith(userDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(mockUserModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { USER_ROLES } from './user.constants';

const mockUser = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call UsersService.findAll and return an array of users', async () => {
      const result = await controller.findAll();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });
});

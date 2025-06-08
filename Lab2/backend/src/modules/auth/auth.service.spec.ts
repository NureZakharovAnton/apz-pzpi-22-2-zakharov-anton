import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { USER_ROLES } from '../users/user.constants';

const mockUser = {
  _id: '1',
  name: 'John Doe',
  email: 'test@example.com',
  password: 'hashedPassword',
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

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: typeof mockUsersService;
  let jwtService: typeof mockJwtService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return the user if validation succeeds', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      usersService.findByEmail.mockResolvedValue(mockUser);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(result).toEqual(mockUser);
    });

    it('should return null if validation fails', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      usersService.findByEmail.mockResolvedValue(mockUser);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token if login is successful', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValue(mockUser as any);
      jwtService.sign.mockReturnValue('testToken');

      const result = await authService.login('test@example.com', 'password');

      expect(authService.validateUser).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser._id,
        email: mockUser.email,
      });
      expect(result).toEqual({ accessToken: 'testToken' });
    });

    it('should throw an UnauthorizedException if validation fails', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(
        authService.login('test@example.com', 'password'),
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should create a new user with a hashed password', async () => {
      const userDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'test',
        role: USER_ROLES.CUSTOMER,
      };
      const hashedPassword = 'hashedPassword';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      usersService.create.mockResolvedValue(mockUser);

      const result = await authService.register(userDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(usersService.create).toHaveBeenCalledWith({
        ...userDto,
        password: hashedPassword,
      });
      expect(result).toEqual(mockUser);
    });
  });
});

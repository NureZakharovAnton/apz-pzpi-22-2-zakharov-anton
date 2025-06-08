import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { UserDocument } from './user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    const user = await this.userModel.find().exec();
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      updateUserDto,
      {
        new: true,
      },
    );

    return user;
  }

  async deleteById(id: string) {
    const user = await this.userModel.findOneAndDelete({ _id: id });
    return user;
  }
}

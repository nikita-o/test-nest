import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const newUser: UserDocument = new this.userModel({
      email: data.email,
      name: data.name,
      contactPhone: data.contactPhone,
      passwordHash: createHash('md5').update(data.password).digest(),
    });
    Logger.debug('Create user');
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    Logger.debug('findByEmail');
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    Logger.debug('findById');
    return this.userModel.findById(id).exec();
  }
}

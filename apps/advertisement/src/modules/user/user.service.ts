import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { getHash } from '../../common/utils/hash';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    this.logger.debug('create');
    const newUser: UserDocument = new this.userModel({
      email: data.email,
      name: data.name,
      contactPhone: data.contactPhone,
      passwordHash: getHash(data.password),
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.debug('findByEmail');
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    this.logger.debug('findById');
    return this.userModel.findById(id).exec();
  }
}

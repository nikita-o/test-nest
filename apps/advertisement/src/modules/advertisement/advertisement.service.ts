import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Advertisement, AdvertisementDocument } from '../../database/schemas/advertisement.schema';
import { Model } from 'mongoose';
import { AdvertisementCreateDto } from './dto/advertisementCreate.dto';
import { AdvertisementFindDto } from './dto/advertisementFind.dto';

@Injectable()
export class AdvertisementService {
  private readonly logger: Logger = new Logger(AdvertisementService.name);

  constructor(
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<AdvertisementDocument>,
  ) {}

  find(params: AdvertisementFindDto): Promise<Advertisement[]> {
    this.logger.debug('find');
    const { shortText, description, userId, tags } = params;
    return this.advertisementModel
      .find({
        isDeleted: false,
        user: userId,
        tags: tags,
        description: { $regex: description },
        shortText: { $regex: shortText },
      })
      .exec();
  }

  create(advertisementCreateDto: AdvertisementCreateDto): Promise<Advertisement> {
    this.logger.debug('create');
    const createdAdvertisement: AdvertisementDocument = new this.advertisementModel(advertisementCreateDto);
    return createdAdvertisement.save();
  }

  remove(id: string): void {
    this.logger.debug('remove');
    this.advertisementModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });
  }

  findById(id: string): Promise<Advertisement> {
    this.logger.debug('findById');
    return this.advertisementModel.findById(id).exec();
  }
}

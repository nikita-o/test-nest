import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Advertisement,
  AdvertisementDocument,
} from '../../schemas/advertisement.schema';
import { Model } from 'mongoose';
import { AdvertisementCreateDto } from './dto/advertisementCreate.dto';
import { AdvertisementFindDto } from './dto/advertisementFind.dto';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<AdvertisementDocument>,
  ) {}

  find(params: AdvertisementFindDto): Promise<Advertisement[]> {
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

  create(
    advertisementCreateDto: AdvertisementCreateDto,
  ): Promise<Advertisement> {
    const createdAdvertisement: AdvertisementDocument =
      new this.advertisementModel(advertisementCreateDto);
    return createdAdvertisement.save();
  }

  remove(id: string): void {
    this.advertisementModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
      },
    });
  }

  findById(id: string): Promise<Advertisement> {
    return this.advertisementModel.findById(id).exec();
  }
}

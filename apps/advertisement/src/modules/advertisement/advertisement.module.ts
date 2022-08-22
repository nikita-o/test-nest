import { Module } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './advertisement.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Advertisement, advertisementSchema } from '../../database/schemas/advertisement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advertisement.name, schema: advertisementSchema },
    ]),
  ],
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}

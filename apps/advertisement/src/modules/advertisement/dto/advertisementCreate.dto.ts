import { IsString } from 'class-validator';

export class AdvertisementCreateDto {
  @IsString()
  shortText: string;
  @IsString()
  description: string;
  @IsString()
  userId: string;
  @IsString({ each: true })
  tags!: string[];
}

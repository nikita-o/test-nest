import { IsString } from 'class-validator';

export class AdvertisementFindDto {
  @IsString()
  shortText: string;
  @IsString()
  description: string;
  @IsString()
  userId: string;
  @IsString({ each: true })
  tags: string[];
}

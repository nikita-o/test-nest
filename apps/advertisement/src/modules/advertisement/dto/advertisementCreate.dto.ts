import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdvertisementCreateDto {
  @ApiProperty({ type: String })
  @IsString()
  shortText: string;
  @ApiProperty({ type: String })
  @IsString()
  description: string;
  @ApiProperty({ type: String })
  @IsString()
  userId: string;

  @IsString({ each: true })
  tags!: string[];
}

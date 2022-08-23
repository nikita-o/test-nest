import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { Advertisement } from '../../database/schemas/advertisement.schema';
import { AdvertisementCreateDto } from './dto/advertisementCreate.dto';
import { AdvertisementFindDto } from './dto/advertisementFind.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private advertisementService: AdvertisementService) {}

  @Get()
  async findAll(@Param() params: AdvertisementFindDto): Promise<Advertisement[]> {
    return await this.advertisementService.find(params);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Advertisement> {
    return await this.advertisementService.findById(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async create(
    @Body() advertisement: AdvertisementCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<Advertisement> {
    console.log(files);
    return await this.advertisementService.create(advertisement);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.advertisementService.remove(id);
  }
}

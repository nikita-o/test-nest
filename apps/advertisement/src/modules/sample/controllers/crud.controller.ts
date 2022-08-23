import { CrudService } from '../providers/crud.service';
import { Delete, Get, Post, Put } from '@nestjs/common';

export class CrudController {
  constructor(private crudService: CrudService) {}

  @Post()
  async create() {
    return 1;
  }

  @Get()
  async read() {
    return 1;
  }

  @Put()
  async update() {
    return 1;
  }

  @Delete()
  async delete() {
    return 1;
  }
}

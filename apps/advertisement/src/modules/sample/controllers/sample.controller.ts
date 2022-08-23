import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get('hello')
  hello() {
    return 'world';
  }
}

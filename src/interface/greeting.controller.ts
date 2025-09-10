import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('greeting')
@ApiExcludeController()
export class GreetingController {
  constructor() {}

  @Get()
  @Render('greeting')
  getGreeting(@Query('name') name: string) {
    return { name: name || 'Anonymous' };
  }
}

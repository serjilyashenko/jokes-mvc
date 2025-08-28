import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller('greeting')
export class GreetingController {
  constructor() {}

  @Get()
  @Render('greeting')
  getGreeting(@Query('name') name: string) {
    return { name: name || 'Anonymous' };
  }
}

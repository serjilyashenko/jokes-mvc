import { Module } from '@nestjs/common';
import { GreetingController } from './greeting.controller';

@Module({
  controllers: [GreetingController],
  providers: [],
})
export class GreetingModule {}

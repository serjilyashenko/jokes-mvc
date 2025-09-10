import { Module } from '@nestjs/common';
import { GreetingController } from '../../interface/greeting.controller';

@Module({
  controllers: [GreetingController],
  providers: [],
})
export class GreetingModule {}

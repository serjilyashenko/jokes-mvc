import { Module } from '@nestjs/common';
import { GreetingController } from '../../presentation/greeting.controller';

@Module({
  controllers: [GreetingController],
  providers: [],
})
export class GreetingModule {}

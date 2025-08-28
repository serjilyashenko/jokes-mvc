import { Module } from '@nestjs/common';
import { JokeController } from './joke.controller';

@Module({
  controllers: [JokeController],
  // providers: [JokeService],
})
export class JokeModule {}

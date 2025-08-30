import { Module } from '@nestjs/common';
import { JokeService } from './joke.service';
import { JokeViewController } from './controllers/joke-view.controller';

@Module({
  controllers: [JokeViewController],
  providers: [JokeService],
})
export class JokeModule {}

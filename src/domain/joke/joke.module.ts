import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeViewController } from './controllers/joke-view.controller';
import { JokeService } from './joke.service';
import { Joke } from './entities/joke.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokeViewController],
  providers: [JokeService],
})
export class JokeModule {}

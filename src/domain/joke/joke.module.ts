import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeViewController } from './controllers/joke-view.controller';
import { JokeService } from './joke.service';
import { Joke } from './entities/joke.entity';
import { JokeTypeormRepository } from '../../infra/database/reppositories/joke.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokeViewController],
  providers: [
    JokeService,
    {
      provide: 'IJokeRepository',
      useClass: JokeTypeormRepository,
    },
  ],
})
export class JokeModule {}

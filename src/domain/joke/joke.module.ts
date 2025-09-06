import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeViewController } from './controllers/joke-view.controller';
import { JokeService } from './joke.service';
import { Joke } from './entities/joke.entity';
import { JokeTypeormRepository } from '../../infra/database/reppositories/joke.typeorm.repository';
import { JokeMapper } from './mappers/joke.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokeViewController],
  providers: [
    JokeService,
    JokeMapper,
    {
      provide: 'IJokeRepository',
      useClass: JokeTypeormRepository,
    },
  ],
})
export class JokeModule {}

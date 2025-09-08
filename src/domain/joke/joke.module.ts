import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokeViewController } from '../../interface/joke-view.controller';
import { JokeService } from './joke.service';
import { JokeEntity } from './entities/joke.entity';
import { JokeTypeormRepository } from '../../infra/database/reppositories/joke.typeorm.repository';
import { JokeMapper } from './mappers/joke.mapper';
import { ExternalJokeModule } from '../../client/external-joke/external-joke.module';
import { IJokeRepositoryToken } from './interfaces/joke.repository.interface';
import { JokeApiController } from '../../interface/joke-api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JokeEntity]), ExternalJokeModule],
  controllers: [JokeViewController, JokeApiController],
  providers: [
    JokeService,
    JokeMapper,
    {
      provide: IJokeRepositoryToken,
      useClass: JokeTypeormRepository,
    },
  ],
})
export class JokeModule {}

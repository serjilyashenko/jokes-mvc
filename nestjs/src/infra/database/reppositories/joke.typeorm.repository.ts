import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JokeEntity } from '../../../domain/joke/entities/joke.entity';
import { Repository } from 'typeorm';
import { IJokeRepository } from '../../../domain/joke/interfaces/joke.repository.interface';
import { BaseTypeOrmRepository } from './base.typeorm.repositoty';

@Injectable()
export class JokeTypeormRepository
  extends BaseTypeOrmRepository<JokeEntity>
  implements IJokeRepository
{
  constructor(
    @InjectRepository(JokeEntity)
    private jokeRepository: Repository<JokeEntity>,
  ) {
    super(jokeRepository);
  }
}

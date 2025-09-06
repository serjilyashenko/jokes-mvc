import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Joke } from '../../../domain/joke/entities/joke.entity';
import { Repository } from 'typeorm';
import { IJokeRepository } from '../../../domain/joke/interfaces/joke.repository.interface';
import { BaseTypeOrmRepository } from './base.typeorm.repositoty';

@Injectable()
export class JokeTypeormRepository
  extends BaseTypeOrmRepository<Joke>
  implements IJokeRepository
{
  constructor(
    @InjectRepository(Joke)
    private jokeRepository: Repository<Joke>,
  ) {
    super(jokeRepository);
  }
}

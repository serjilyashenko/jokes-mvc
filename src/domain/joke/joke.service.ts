import { Inject, Injectable } from '@nestjs/common';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { JokeViewDto } from './dto/joke-view.dto';
import { IJokeRepository } from './interfaces/joke.repository.interface';
import { JokeMapper } from './mappers/joke.mapper';
import { Joke } from './entities/joke.entity';

@Injectable()
export class JokeService {
  constructor(
    @Inject('IJokeRepository')
    private readonly jokeRepository: IJokeRepository,
    private readonly jokeMapper: JokeMapper,
  ) {}

  create(createJokeDto: CreateJokeDto) {
    console.log('>> joke created', createJokeDto.content);
    return 'This action adds a new joke';
  }

  findAll() {
    return `This action returns all joke`;
  }

  async findAllViewDto(): Promise<Array<JokeViewDto>> {
    const jokeEntities: Joke[] = await this.jokeRepository.findAll();
    return this.jokeMapper.toViewDto(jokeEntities);
  }

  // Not implemented yet
  findOne(id: number) {
    return `This action returns a #${id} joke`;
  }

  // Not implemented yet
  update(id: number, updateJokeDto: UpdateJokeDto) {
    return `This action updates a #${id} joke`;
  }

  async remove(id: string): Promise<void> {
    await this.jokeRepository.delete(id);
  }
}

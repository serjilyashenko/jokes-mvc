import { Inject, Injectable } from '@nestjs/common';
import { UpdateJokeDto } from './dto/update-joke.dto';
import { CreateJokeDto } from './dto/create-joke.dto';
import { JokeViewDto } from './dto/joke-view.dto';
import {
  IJokeRepository,
  IJokeRepositoryToken,
} from './interfaces/joke.repository.interface';
import { JokeMapper } from './mappers/joke.mapper';
import { JokeEntity } from './entities/joke.entity';
import {
  IExternalJokeService,
  IExternalJokeServiceToken,
} from './interfaces/external-joke.service.interface';
import { CreateJokeViewDto } from './dto/create-joke-view.dto';

@Injectable()
export class JokeService {
  constructor(
    @Inject(IJokeRepositoryToken)
    private readonly jokeRepository: IJokeRepository,
    @Inject(IExternalJokeServiceToken)
    private readonly externalJokeService: IExternalJokeService,
    private readonly jokeMapper: JokeMapper,
  ) {}

  async create(createJokeDto: CreateJokeDto): Promise<JokeEntity> {
    const jokeEntity: JokeEntity = JokeEntity.create({ ...createJokeDto });
    return await this.jokeRepository.save(jokeEntity);
  }

  async getCreateViewDto(): Promise<CreateJokeViewDto> {
    const externalJokeEntity = await this.externalJokeService.getJoke();
    return { content: externalJokeEntity?.joke || '' };
  }

  findAll() {
    return `This action returns all joke`;
  }

  async findAllViewDto(): Promise<Array<JokeViewDto>> {
    const jokeEntities: JokeEntity[] = await this.jokeRepository.findAll();
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

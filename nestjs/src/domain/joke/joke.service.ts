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
import { JokeApiDto } from './dto/joke-api.dto';

@Injectable()
export class JokeService {
  constructor(
    @Inject(IJokeRepositoryToken)
    private readonly jokeRepository: IJokeRepository,
    @Inject(IExternalJokeServiceToken)
    private readonly externalJokeService: IExternalJokeService,
    private readonly jokeMapper: JokeMapper,
  ) {}

  async create(
    _userId: string,
    createJokeDto: CreateJokeDto,
  ): Promise<JokeEntity> {
    // TODO: Use userId to associate joke with a user
    const jokeEntity: JokeEntity = JokeEntity.create({ ...createJokeDto });
    return await this.jokeRepository.save(jokeEntity);
  }

  async getCreateViewDto(): Promise<CreateJokeViewDto> {
    const externalJokeEntity = await this.externalJokeService.getJoke();
    return { content: externalJokeEntity?.joke || '' };
  }

  async findAllApiDto(_userId: string): Promise<JokeApiDto[]> {
    // TODO: Use userId to filter jokes
    const jokeEntities: JokeEntity[] = await this.jokeRepository.findAll();
    return this.jokeMapper.toApiDto(jokeEntities);
  }

  async findAllViewDto(): Promise<Array<JokeViewDto>> {
    const jokeEntities: JokeEntity[] = await this.jokeRepository.findAll();
    return this.jokeMapper.toViewDto(jokeEntities);
  }

  async findOne(_userId: string, jokeId: string): Promise<JokeApiDto | null> {
    // TODO: Use userId to verify access to the joke
    const jokeEntity = await this.jokeRepository.findById(jokeId);
    if (!jokeEntity) {
      return null;
    }
    return this.jokeMapper.toApiDto(jokeEntity);
  }

  async update(
    _userId: string,
    jokeId: string,
    updateJokeDto: UpdateJokeDto,
  ): Promise<JokeApiDto | null> {
    // TODO: Use userId to verify access to the joke
    const originalJokeEntity = await this.jokeRepository.findById(jokeId);
    if (!originalJokeEntity) {
      return null;
    }
    const updatedJokeEntity = JokeEntity.merge(originalJokeEntity, {
      ...updateJokeDto,
    });
    return this.jokeRepository.save(updatedJokeEntity);
  }

  async remove(_userId: string, jokeId: string): Promise<void> {
    // TODO: Use userId to verify access to the joke
    await this.jokeRepository.delete(jokeId);
  }
}

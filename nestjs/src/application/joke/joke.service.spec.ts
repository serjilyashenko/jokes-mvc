/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { type Mocked } from 'vitest';
import { JokeService } from './joke.service';
import {
  IJokeRepository,
  IJokeRepositoryToken,
} from '../../domain/joke/joke.repository.interface';
import { IExternalJokeServiceToken } from '../../domain/external-joke/external-joke.service.interface';
import { JokeMapper } from './mappers/joke.mapper';
import { JokeEntity } from '../../infrastructure/reppositories/joke/entities/joke.entity';
import { JokeApiDto } from './dto/joke-api.dto';

describe('JokeService', () => {
  let service: JokeService;
  let mapper: Mocked<JokeMapper>;
  let repo: Mocked<IJokeRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JokeService,
        {
          provide: IJokeRepositoryToken,
          useValue: {
            findAll: vi.fn(),
            findById: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
          },
        },
        {
          provide: JokeMapper,
          useValue: {
            toApiDto: vi.fn(),
            toViewDto: vi.fn(),
          },
        },
        {
          provide: IExternalJokeServiceToken,
          useValue: {
            getRandomJoke: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<JokeService>(JokeService);
    mapper = module.get<Mocked<JokeMapper>>(JokeMapper);
    repo = module.get<Mocked<IJokeRepository>>(IJokeRepositoryToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return one joke', async () => {
    const MOCK_ID = '1';
    const MOCK_CONTENT = 'mock-content';
    const MOCK_DATE = new Date('2024-01-01T00:00:00Z');

    const mockEntity: JokeEntity = new JokeEntity();
    mockEntity.id = MOCK_ID;
    mockEntity.content = MOCK_CONTENT;
    mockEntity.createdAt = MOCK_DATE;

    const mockDto = new JokeApiDto();
    mockDto.id = MOCK_ID;
    mockDto.content = MOCK_CONTENT;
    mockDto.createdAt = MOCK_DATE;

    repo.findById.mockResolvedValue(mockEntity);
    mapper.toApiDto.mockReturnValue(mockDto);

    const result = await service.findOne('user-id', MOCK_ID);

    expect(repo.findById).toHaveBeenCalledTimes(1);
    expect(repo.findById).toHaveBeenCalledWith(MOCK_ID);
    expect(mapper.toApiDto).toHaveBeenCalledTimes(1);
    expect(mapper.toApiDto).toHaveBeenCalledWith(mockEntity);
    expect(result).toEqual(mockDto);
  });
});

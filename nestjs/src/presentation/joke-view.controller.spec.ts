import { Test, TestingModule } from '@nestjs/testing';
import { JokeViewController } from './joke-view.controller';
import { JokeService } from '../application/joke/joke.service';

describe('JokeController', () => {
  let controller: JokeViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokeViewController],
      providers: [
        {
          provide: JokeService,
          useValue: {
            create: vi.fn(),
            getCreateViewDto: vi.fn(),
            findAllApiDto: vi.fn(),
            findAllViewDto: vi.fn(),
            findOne: vi.fn(),
            update: vi.fn(),
            remove: vi.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JokeViewController>(JokeViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

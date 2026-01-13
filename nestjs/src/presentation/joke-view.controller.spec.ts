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
            create: jest.fn(),
            getCreateViewDto: jest.fn(),
            findAllApiDto: jest.fn(),
            findAllViewDto: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
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

import { Test, TestingModule } from '@nestjs/testing';
import { JokeViewController } from './joke-view.controller';
import { JokeService } from '../domain/joke/joke.service';

describe('JokeController', () => {
  let controller: JokeViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokeViewController],
      providers: [JokeService],
    }).compile();

    controller = module.get<JokeViewController>(JokeViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { JokeController } from './joke.controller';
import { JokeService } from './joke.service';

describe('JokeController', () => {
  let controller: JokeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JokeController],
      providers: [JokeService],
    }).compile();

    controller = module.get<JokeController>(JokeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

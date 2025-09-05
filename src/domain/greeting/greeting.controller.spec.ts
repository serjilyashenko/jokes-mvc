import { Test, TestingModule } from '@nestjs/testing';
import { GreetingController } from './greeting.controller';

describe('GreetingController', () => {
  let controller: GreetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingController],
      providers: [],
    }).compile();

    controller = module.get<GreetingController>(GreetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return name for template rendering', () => {
    const result = controller.getGreeting('Alice');
    expect(result).toEqual({ name: 'Alice' });
  });
});

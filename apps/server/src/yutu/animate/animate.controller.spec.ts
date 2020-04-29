import { Test, TestingModule } from '@nestjs/testing';
import { AnimateController } from './animate.controller';

describe('Animate Controller', () => {
  let controller: AnimateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimateController],
    }).compile();

    controller = module.get<AnimateController>(AnimateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

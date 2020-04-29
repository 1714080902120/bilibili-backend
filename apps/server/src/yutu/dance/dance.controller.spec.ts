import { Test, TestingModule } from '@nestjs/testing';
import { DanceController } from './dance.controller';

describe('Dance Controller', () => {
  let controller: DanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanceController],
    }).compile();

    controller = module.get<DanceController>(DanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

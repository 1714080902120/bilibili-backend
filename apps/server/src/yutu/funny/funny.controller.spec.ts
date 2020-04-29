import { Test, TestingModule } from '@nestjs/testing';
import { FunnyController } from './funny.controller';

describe('Funny Controller', () => {
  let controller: FunnyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunnyController],
    }).compile();

    controller = module.get<FunnyController>(FunnyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

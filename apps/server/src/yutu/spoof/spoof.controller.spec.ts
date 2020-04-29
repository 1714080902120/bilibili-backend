import { Test, TestingModule } from '@nestjs/testing';
import { SpoofController } from './spoof.controller';

describe('Spoof Controller', () => {
  let controller: SpoofController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpoofController],
    }).compile();

    controller = module.get<SpoofController>(SpoofController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

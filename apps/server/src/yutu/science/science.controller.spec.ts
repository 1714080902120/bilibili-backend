import { Test, TestingModule } from '@nestjs/testing';
import { ScienceController } from './science.controller';

describe('Science Controller', () => {
  let controller: ScienceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScienceController],
    }).compile();

    controller = module.get<ScienceController>(ScienceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

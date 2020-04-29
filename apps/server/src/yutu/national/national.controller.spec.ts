import { Test, TestingModule } from '@nestjs/testing';
import { NationalController } from './national.controller';

describe('National Controller', () => {
  let controller: NationalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationalController],
    }).compile();

    controller = module.get<NationalController>(NationalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DigitalController } from './digital.controller';

describe('Digital Controller', () => {
  let controller: DigitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalController],
    }).compile();

    controller = module.get<DigitalController>(DigitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

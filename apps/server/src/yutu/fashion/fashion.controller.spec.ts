import { Test, TestingModule } from '@nestjs/testing';
import { FashionController } from './fashion.controller';

describe('Fashion Controller', () => {
  let controller: FashionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FashionController],
    }).compile();

    controller = module.get<FashionController>(FashionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

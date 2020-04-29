import { Test, TestingModule } from '@nestjs/testing';
import { DocumentaryController } from './documentary.controller';

describe('Documentary Controller', () => {
  let controller: DocumentaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentaryController],
    }).compile();

    controller = module.get<DocumentaryController>(DocumentaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

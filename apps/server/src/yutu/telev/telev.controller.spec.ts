import { Test, TestingModule } from '@nestjs/testing';
import { TelevController } from './telev.controller';

describe('Telev Controller', () => {
  let controller: TelevController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelevController],
    }).compile();

    controller = module.get<TelevController>(TelevController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { FashionController } from './fashion.controller';

@Module({
  controllers: [FashionController]
})
export class FashionModule {}

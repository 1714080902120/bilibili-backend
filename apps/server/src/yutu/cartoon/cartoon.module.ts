import { Module } from '@nestjs/common';
import { CartoonController } from './cartoon.controller';

@Module({
  controllers: [CartoonController]
})
export class CartoonModule {}

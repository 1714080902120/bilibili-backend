import { Module } from '@nestjs/common';
import { FunnyController } from './funny.controller';

@Module({
  controllers: [FunnyController]
})
export class FunnyModule {}

import { Module } from '@nestjs/common';
import { DanceController } from './dance.controller';

@Module({
  controllers: [DanceController]
})
export class DanceModule {}

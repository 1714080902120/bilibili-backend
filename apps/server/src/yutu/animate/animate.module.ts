import { Module } from '@nestjs/common';
import { AnimateController } from './animate.controller';

@Module({
  controllers: [AnimateController]
})
export class AnimateModule {}

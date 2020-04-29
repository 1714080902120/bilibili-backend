import { Module } from '@nestjs/common';
import { SpoofController } from './spoof.controller';

@Module({
  controllers: [SpoofController]
})
export class SpoofModule {}

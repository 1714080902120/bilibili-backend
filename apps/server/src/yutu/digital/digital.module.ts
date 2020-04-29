import { Module } from '@nestjs/common';
import { DigitalController } from './digital.controller';

@Module({
  controllers: [DigitalController]
})
export class DigitalModule {}

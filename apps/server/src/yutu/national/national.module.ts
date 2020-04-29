import { Module } from '@nestjs/common';
import { NationalController } from './national.controller';

@Module({
  controllers: [NationalController]
})
export class NationalModule {}

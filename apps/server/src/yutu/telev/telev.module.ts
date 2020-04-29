import { Module } from '@nestjs/common';
import { TelevController } from './telev.controller';

@Module({
  controllers: [TelevController]
})
export class TelevModule {}

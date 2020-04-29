import { Module } from '@nestjs/common';
import { DocumentaryController } from './documentary.controller';

@Module({
  controllers: [DocumentaryController]
})
export class DocumentaryModule {}

import { Module } from '@nestjs/common';
import { DailyController } from './daily.controller';

@Module({
  controllers: [DailyController]
})
export class DailyModule {}

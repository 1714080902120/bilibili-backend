import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '@app/common';
import { YutuModule } from './yutu/yutu.module';

@Module({
  imports: [
    CommonModule,
    YutuModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

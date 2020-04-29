import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '@app/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { YutuModule } from './yutu/yutu.module';

@Module({
  imports: [
    CommonModule,
    CoursesModule,
    AuthModule,
    YutuModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@app/common';

// import MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      dest: 'bilibili_data/upload_data',
      // 使用阿里OSS
      // useFactory() {
      //   return {
      //     storage: MAO({
      //       config: {
      //         region: 'oss-cn-shenzhen',
      //         accessKeyId: '123',
      //         accessKeySecret: '123',
      //         bucket: 'E:/VScode/他人项目/topfullstack',
      //       },
      //     }),
      //   };
      // },
    }),
    // 导入模块
    UsersModule,
    CoursesModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

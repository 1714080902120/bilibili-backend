import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  // 使用EXPRESS框架
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 允许跨域
  app.enableCors();

  // 静态文件夹位置
  app.useStaticAssets('bilibili_data', {
    prefix: '/bilibili_data',
  });

  const options = new DocumentBuilder()
    .setTitle('仿bilibili后台管理系统')
    .setDescription('提供给管理系统的后台API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // 端口位置
  const PORT = process.env.ADMIN_PORT || 4001;
  await app.listen(PORT);
}

bootstrap();

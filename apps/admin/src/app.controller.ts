import { Controller, Get, Post, UseInterceptors, Req, UploadedFile } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class AppController {

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    return {
      url: `${process.env.ADMIN_BASE_URL}/${process.env.DOWNLOAD_PATH}/${file.filename}`,
    };
  }
}

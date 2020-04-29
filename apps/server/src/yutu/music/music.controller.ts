import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { MusicData } from '@libs/db/models/other.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('音乐区信息')
@Controller('music')
export class MusicController {
  constructor(@InjectModel(MusicData) private readonly model) {}

  @Get('data')
  @ApiOperation({ description: 'Get, 获取音乐页数据，参数：无' })
  async Data(@Res() res) {
    const front = 'E:/VScode/bilibili/';
    const data = await this.model.find();
    data.forEach(e => {
      e.list.forEach(ee => {
        let a;
        a = ee.img.src.split(front);
        ee.img.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
      });
    });

    return res.status(HttpStatus.OK).json(data);
  }
}

import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import UP from '@libs/db/models/up.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('up主信息')
@Controller('up')
export class UpController {
  constructor(@InjectModel(UP) private readonly model) { }

  @Get('data')
  @ApiQuery({ name: 'uuid', type: String })
  @ApiOperation({ description: 'Get, 获取up主数据，参数：uuid/mid' })
  async baseInfo(@Res() res, @Query() query) {
    try {
      let a;
      let b;
      let z;
      let data;
      const front = 'E:/VScode/bilibili/';
      const { uuid } = query;
      data = (await this.model.find({ 'identy.uuid': uuid }))[0];

      a = data.baseInfo.bg.src.split(front);
      data.baseInfo.bg.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
      b = data.baseInfo.logo.src.split(front);
      data.baseInfo.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;

      if (data.baseInfo.label) {
        z = data.baseInfo.label.split(front);
        data.baseInfo.label = `${process.env.SERVER_BASE_URL}/${z[z.length - 1]}`;
      }

      if (data.cardList.length > 0) {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.cardList.length; i++) {
          let e;
          let c;
          e = data.cardList[i];
          c = e.get('header').logo.src.split(front);
          e.get('header').logo.src = `${process.env.SERVER_BASE_URL}/${c[c.length - 1]}`;
          if (e.get('main').content.inner.img.length > 0) {
            e.get('main').content.inner.img.forEach(ee => {
              let d;
              d = ee.src.split(front);
              ee.src = `${process.env.SERVER_BASE_URL}/${d[d.length - 1]}`;
            });
          }
        }

      }

      return res.status(HttpStatus.OK).json(data);

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }
}

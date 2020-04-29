import { LiveSwipe, LiveData, LiveFooter } from './../../../../../libs/db/src/models/live.model';
import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('直播区信息')
@Controller('live')
export class LiveController {
  constructor(
    @InjectModel(LiveSwipe) private readonly liveSwipe,
    @InjectModel(LiveData) private readonly liveData,
    @InjectModel(LiveFooter) private readonly liveFooter,
  ) {}

  @Get('swipe')
  @ApiOperation({ description: 'Get, 获取直播页轮播数据，参数：无' })
  async Swipe(@Res() res) {
    const front = 'E:/VScode/bilibili/';
    let data;
    data = await this.liveSwipe.find();
    await data.forEach(e => {
      let a;
      let url;
      a = e.src.split(front);
      url = a[a.length - 1];
      e.src = `${process.env.SERVER_BASE_URL}/${url}`;
    });
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('footer')
  @ApiOperation({ description: 'Get, 获取直播页尾部数据，参数：无' })
  async Footer(@Res() res) {
    return res.status(HttpStatus.OK).json(await this.liveFooter.find());
  }

  @Get('data')
  @ApiOperation({ description: 'Get, 获取直播页数据，参数：无' })
  async Data(@Res() res) {
    const front = 'E:/VScode/bilibili/';
    const data = await this.liveData.find();
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

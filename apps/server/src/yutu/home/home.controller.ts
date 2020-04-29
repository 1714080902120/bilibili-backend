import { HomeSwipe, HomeData } from './../../../../../libs/db/src/models/home.model';
import { Controller, Get, HttpStatus, Res, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('首页信息')
@Controller('home')
export class HomeController {
  constructor(
    @InjectModel(HomeSwipe) private readonly homeSwipe,
    @InjectModel(HomeData) private readonly homeData,
  ) { }
  @Get('swipe')
  @ApiOperation({ description: 'Get, 获取推荐页轮播数据，参数：无' })
  async Swipe(@Res() res) {
    const front = 'E:/VScode/bilibili/';
    let data;
    data = await this.homeSwipe.find();
    await data.forEach(e => {
      let a;
      let url;
      a = e.url.split(front);
      url = a[a.length - 1];
      e.url = `${process.env.SERVER_BASE_URL}/${url}`;
    });
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('data')
  @ApiQuery({ name: 'skip', type: String })
  @ApiOperation({ description: 'Get, 获取推荐页数据，参数：skip跳过页数, 默认每页20' })
  async Data(@Res() res, @Query() query) {
    try {
      let { skip } = query;
      const front = 'E:/VScode/bilibili/';
      let data;
      skip = Number(skip);
      data = await this.homeData.find().skip(20 * skip).limit(20);
      data.forEach(e => {
        let a;
        let b;
        let like;
        let coins;
        let collect;
        let share;
        like = Math.round(Math.random() * 60000);
        coins = Math.round(Math.random() * 30000);
        collect = Math.round(Math.random() * 50000);
        share = Math.round(Math.random() * 30000);
        if (like >= 10000) {
          like = (like / 10000).toFixed(1) + '万';
        }
        if (coins >= 10000) {
          coins = (coins / 10000).toFixed(1) + '万';
        }
        if (collect >= 10000) {
          collect = (collect / 10000).toFixed(1) + '万';
        }
        if (share >= 10000) {
          share = (share / 10000).toFixed(1) + '万';
        }
        a = e.img.src.split(front);
        e.img.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
        b = e.video.src.split(front);
        e.video.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
        e.video.people_feel = {
          like,
          disLike: '0',
          coins,
          collect,
          share,
        };
        e.assess.detail.forEach(ee => {
          let c;
          c = ee.src.split(front);
          ee.src = `${process.env.SERVER_BASE_URL}/${c[c.length - 1]}`;
        });
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }
}

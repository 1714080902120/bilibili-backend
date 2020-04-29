import { AlbumDrawData, AlbumTakeData, AlbumDetailDrawData, AlbumDetailTakeData } from './../../../../../libs/db/src/models/album.model';
import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('相簿区信息')
@Controller('album')
export class AlbumController {
  constructor(
    @InjectModel(AlbumDrawData) private readonly albumDrawData,
    @InjectModel(AlbumTakeData) private readonly albumTakeData,
    @InjectModel(AlbumDetailDrawData) private readonly albumDetailDrawData,
    @InjectModel(AlbumDetailTakeData) private readonly albumDetailTakeData,
  ) { }

  @Get('draw')
  @ApiQuery({ name: 'skip', type: String })
  @ApiOperation({ description: 'Get, 获取相簿画，参数：skip跳过页数, 默认每页20' })
  async Draw(@Res() res, @Query() query) {
    try {
      const front = 'E:/VScode/bilibili/';
      let { skip } = query;
      skip = Number(skip);
      const data = await this.albumDrawData.find().skip(20 * skip).limit(20);
      data.forEach(e => {
        let a;
        let b;
        a = e.img.src.split(front);
        e.img.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
        b = e.up.logo.src.split(front);
        e.up.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }

  @Get('take')
  @ApiQuery({ name: 'skip', type: String })
  @ApiOperation({ description: 'Get, 获取相簿照片，参数：skip跳过页数, 默认每页20' })
  async Take(@Res() res, @Query() query) {
    try {
      const front = 'E:/VScode/bilibili/';
      let { skip } = query;
      skip = Number(skip);
      const data = await this.albumTakeData.find().skip(20 * skip).limit(20);
      data.forEach(e => {
        let a;
        let b;
        a = e.img.src.split(front);
        e.img.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
        b = e.up.logo.src.split(front);
        e.up.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });

      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }

  @Get('draw-detail')
  @ApiQuery({ name: 'mid', type: String })
  @ApiOperation({ description: 'Get, 获取相簿画详细，参数：mid/uuid' })
  async DrawDetail(@Res() res, @Query() query) {
    try {
      const front = 'E:/VScode/bilibili/';
      const { mid } = query;
      let data;
      data = (await this.albumDetailDrawData.find({ mid }))[0];
      let a;
      a = data.up_info.logo.src.split(front);
      data.up_info.logo.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
      data.content.img.forEach(e => {
        let b;
        b = e.src.split(front);
        e.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });
      data.assess.items.forEach(e => {
        let b;
        b = e.logo.src.split(front);
        e.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });
      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }

  @Get('take-detail')
  @ApiQuery({ name: 'mid', type: String })
  @ApiOperation({ description: 'Get, 获取相簿照片详细，参数：mid/uuid' })
  async TakeDetail(@Res() res, @Query() query) {
    try {
      const front = 'E:/VScode/bilibili/';
      const { mid } = query;
      let data;
      data = (await this.albumDetailTakeData.find({ mid }))[0];
      let a;
      a = data.up_info.logo.src.split(front);
      data.up_info.logo.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
      data.content.img.forEach(e => {
        let b;
        b = e.src.split(front);
        e.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });
      data.assess.items.forEach(e => {
        let b;
        b = e.logo.src.split(front);
        e.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;
      });
      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }
}

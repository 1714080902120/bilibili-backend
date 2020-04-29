import { UploadData } from './../../../../../libs/db/src/models/upload.model';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Query, Res, HttpStatus, Put, Post, UseInterceptors, UploadedFile, UploadedFiles, Body } from '@nestjs/common';
import { User } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { createWriteStream, mkdir } from 'fs';
import { ApiOperation, ApiTags, ApiQuery, ApiProperty, ApiBody } from '@nestjs/swagger';

class UpdateDto {

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

}

// tslint:disable-next-line: max-classes-per-file
class PostDto {

  @ApiProperty()
  src: any;

  @ApiProperty()
  name: string;

}

// tslint:disable-next-line: max-classes-per-file
class AddCardDto {

  @ApiProperty()
  type: string;

  @ApiProperty()
  upname: string;

  @ApiProperty()
  logoSrc: string;

  @ApiProperty()
  logoName: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  ellipsis: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  title: string;

}

// tslint:disable-next-line: max-classes-per-file
@ApiTags('用户信息')
@Controller('user')
export class UserController {
  constructor(
    @InjectModel(User) private readonly model,
    @InjectModel(UploadData) private readonly uploadModel,
  ) { }

  @Get('base-info')
  @ApiQuery({ name: '这是一个bug', type: String })
  @ApiOperation({ description: 'Get, 获取用户数据，参数：username' })
  async baseInfo(@Res() res, @Query() query) {
    try {
      let a;
      let b;
      let data;
      const front = 'E:/VScode/bilibili/';
      const { username } = query;
      data = (await this.model.find({ username }))[0];
      a = data.baseInfo.bg.src.split(front);
      data.baseInfo.bg.src = `${process.env.SERVER_BASE_URL}/${a[a.length - 1]}`;
      b = data.baseInfo.logo.src.split(front);
      data.baseInfo.logo.src = `${process.env.SERVER_BASE_URL}/${b[b.length - 1]}`;

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

  @Put('update')
  @ApiQuery({ name: '这是一个bug', type: UpdateDto })
  @ApiOperation({ description: 'Put, 更新用户数据，参数：username，用户名name，desc' })
  async Update(@Res() res, @Query() query: UpdateDto) {
    try {
      const { username, name, desc } = query;
      let data;
      data = await this.model.updateOne({ username }, { $set: { 'baseInfo.name': name, 'baseInfo.desc': desc } });
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }
  }

  @Post('upload')
  @ApiBody({ type: PostDto })
  @ApiOperation({ description: 'Post, 更新用户头像或者背景，参数：src, 图像name' })
  @UseInterceptors(FileInterceptor('file'))
  async Upload(@Res() res, @UploadedFile() file, @Body() body: PostDto, @Query() query) {
    try {
      const front = 'http://localhost:4000/';
      // tslint:disable-next-line: prefer-const
      let { src, name } = body;
      // tslint:disable-next-line: no-unused-expression
      src = src.split(front);
      let ws;
      ws = await createWriteStream(`${src[src.length - 1]}${name}`).write(file.buffer);
      return res.status(HttpStatus.OK).json({ data: '更新成功！' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }

  // 投稿
  @Post('add-card')
  @ApiBody({ type: AddCardDto })
  @ApiOperation({ description: 'Post, 投稿，参数：type, upname, logoSrc, logoName, uuid, username, ellipsis, 视频时长time, title， 两个文件封面cover[]和video[]' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]))
  async UploadCard(@UploadedFiles() files, @Res() res, @Body() body: AddCardDto) {
    try {

      // tslint:disable-next-line: max-line-length
      const arr: any[] = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];
      const location = 'bilibili_data/upload_data/';

      const bvid = `BV${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}${arr[Math.round(Math.random() * 71)]}`;
      await mkdir(`${location}${bvid}`, err => err);

      const { type, upname, logoSrc, logoName, uuid, username, ellipsis, time, title } = body;

      await createWriteStream(`${location}${bvid}/${files.cover[0].originalname}`).write(files.cover[0].buffer);
      await createWriteStream(`${location}${bvid}/${files.video[0].originalname}`).write(files.video[0].buffer);

      const data: UploadData = {
        up: {
          username,
          name: upname,
          mid: uuid,
        },
        bvid,
        card: {
          type,
          header: {
            logo: {
              name: logoName,
              src: logoSrc,
            },
            name: upname,
            time: `${new Date().getMonth()}-${new Date().getDate()}•投稿了视频`,
          },
          main: {
            type,
            ellipsis,
            content: {
              ellipsis: '',
              inner: {
                head: '',
                img: [{
                  src: `${process.env.SERVER_BASE_URL}/${location}${bvid}/`,
                  name: `${files.cover[0].originalname}`,
                }],
                detail: [ time, '0观看', '0弹幕' ],
                title,
              },
            },
          },
          footer: {
            share: '转发',
            assess: '评论',
            likes: '点赞',
          },
        },
        videoPage: {
          bvid,
          title,
          video_href: 'javascript:;',
          plays: '0',
          danmaku: '0',
          img: {
            src: `${process.env.SERVER_BASE_URL}/${location}${bvid}/`,
            name: `${files.cover[0].originalname}`,
          },
          video: {
            src: `${process.env.SERVER_BASE_URL}/${location}${bvid}/`,
            name: `${files.video[0].originalname}`,
            long: time,
            label: '',
            danmaku: [],
            people_feel: {
              like: '0',
              disLike: 0,
              coins: '0',
              collect: '0',
              share: '0',
            },
            info: {
              up: upname,
              plays: '1次观看',
              danmaku: '0弹幕',
              time: `${new Date().getMonth()}-${new Date().getDate()}•投稿了视频`,
            },
          },
          up: {
            username,
            name: upname,
            mid: uuid,
          },
          assess: {
            num: '(0)',
            detail: [],
          },
        },
      };
      await this.uploadModel.create(data);
      const result = await this.uploadModel.find();

      return res.status(HttpStatus.OK).json({ message: '投稿成功！', result });
    } catch (error) {

      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', error });
    }

  }
}

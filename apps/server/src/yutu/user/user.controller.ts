import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UploadData } from './../../../../../libs/db/src/models/upload.model';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Query, Res, HttpStatus, Put, Post, UseInterceptors, UploadedFile, UploadedFiles, Body, UseGuards } from '@nestjs/common';
import { User, UserDocument } from '@libs/db/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { createWriteStream, mkdir } from 'fs';
import { ApiOperation, ApiTags, ApiQuery, ApiProperty, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { hashSync, compareSync } from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { UpdateDto, PostDto, AddCardDto } from './dto/others.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import zhenzismsClient = require('./zhenzisms');
import { CurrentUser } from './current-user.decorator.1';
// tslint:disable-next-line: no-var-requires
const request = require('request');

@ApiTags('用户信息')
@Controller('user')
export class UserController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectModel(User) private readonly model,
    @InjectModel(UploadData) private readonly uploadModel,
  ) { }

  @Post('mail-check')
  @ApiProperty({ name: '注册时邮件验证' })
  async mailCheck(@Res() res, @Body() body) {
    const data = await this.userService.sendMail(body);
    return res.status(HttpStatus.OK).json({ data, err: 0 });
  }

  @Post('register')
  @ApiProperty({ name: '注册' })
  async register(@Res() res, @Body() dto: RegisterDto) {
    try {
      const { username, password } = dto;
      if ((await this.model.find({ username })).length !== 0) {
        return res.status(HttpStatus.BAD_REQUEST).json({ data: '该用户名已存在', err: -2 });
      }
      const uuid = Math.round(50000 + Math.random() * 9949999).toString();

      const identy = {
        uuid,
        uuid_href: `https://m.bilibili.com/space/${uuid}`,
      };
      const coin = {
        Bcoins: '0',
        coins: '0',
      };
      // tslint:disable-next-line: variable-name
      const fans_follows = {
        fans: [],
        follows: [],
      };
      // tslint:disable-next-line: no-console
      await mkdir(`bilibili_data/user_data/${uuid}`, err => console.log(err));

      const baseInfo = {
        bg: {
          name: `${uuid}_bg.png`,
          src: `E:/VScode/bilibili/bilibili_data/user_data/${uuid}/`,
          href: '',
        },
        logo: {
          name: `${uuid}_logo.png`,
          src: `E:/VScode/bilibili/bilibili_data/user_data/${uuid}/`,
          href: '',
        },
        name: `bilibili用户_${uuid}`,
        level: '0',
        label: '',
        desc: '这人懒死了，什么都没写~~',
        vip: '',
        fans_follows_likes: {
          fans: '0',
          follows: '0',
          likes: '0',
        },
      };

      const sourceBg = `${process.env.SERVER_BASE_URL}/bilibili_data/bilibili_base/user_bg_init.png`;
      const sourceLogo = `${process.env.SERVER_BASE_URL}/bilibili_data/bilibili_base/user_avatar_init.png`;
      const bg = await createWriteStream(`bilibili_data/user_data/${uuid}/${baseInfo.bg.name}`);
      request(sourceBg, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
        },
      }).pipe(bg).on('close', err => err);

      const logo = await createWriteStream(`bilibili_data/user_data/${uuid}/${baseInfo.logo.name}`);
      request(sourceLogo, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
        },
      }).pipe(logo).on('close', err => err);
      // tslint:disable-next-line: no-console
      await mkdir(`bilibili_data/user_data/${uuid}/list`, err => console.log(err));

      const user = await this.model.create({
        username,
        password,
        identy,
        coin,
        baseInfo,
        cardList: [],
        fans_follows,
      });
      return res.status(HttpStatus.OK).json({ data: user, err: 0 });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', err: -1 });
    }
  }
  // @Get('test2')
  // async Test2() {
  //   return hashSync('443529931')
  // }

  @Post('test')
  async Test() {
    const sourceBg = `${process.env.SERVER_BASE_URL}/bilibili_data/bilibili_base/user_bg_init.png`;
    const bg = await createWriteStream(`bilibili_data/user_data/123.png`);
    request(sourceBg, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36',
      },
    }).pipe(bg).on('close', err => err);
    // createWriteStream(`bilibili_data/user_data/xxx.png`).write(a);
  }

  @Post('login')
  @ApiProperty({ name: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Post('send')
  @ApiProperty({ name: '短信验证' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async send(@Body() body) {
    const { phoneNumber } = body;
    const verification = Math.round(Math.random() * 99999);
    const apiUrl = 'sms_developer.zhenzikj.com';
    const appId = 'xxx';
    const appSecret = 'xxxxx';
    const client = await new zhenzismsClient(apiUrl, appId, appSecret);
    const params = {
      templateId: 'xxx',
      number: phoneNumber,
      templateParams: [verification, '5分钟'],
    };
    const res = await client.send(params);
    const last = await client.balance();
    if (res.code === 0) {
      return verification;
    } else {
      return -1;
    }
  }

  @Get('base-info')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({ name: 'bug，不需要注意', type: String })
  @ApiOperation({ description: 'Get, 获取用户数据，参数：username' })
  async baseInfo(@Res() res, @CurrentUser() user: UserDocument) {
    try {
      let a;
      let b;
      let data;
      const front = 'E:/VScode/bilibili/';
      // const { username } = query;
      data = (await this.model.find({ _id: user._id }))[0];
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
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', err: -1 });
    }

  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiQuery({ name: 'bug，不需要注意', type: UpdateDto })
  @ApiOperation({ description: 'Put, 更新用户数据，参数：username，用户名name，desc' })
  async Update(@Res() res, @Query() query: UpdateDto) {
    try {
      const { username, name, desc } = query;
      let data;
      data = await this.model.updateOne({ username }, { $set: { 'baseInfo.name': name, 'baseInfo.desc': desc } });
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', err: -1 });
    }
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
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
      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', err: -1 });
    }

  }

  // 投稿
  @Post('add-card')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiBody({ type: AddCardDto })
  @ApiOperation({ description: 'Post, 投稿，参数：type, upname, logoSrc, logoName, uuid, username, ellipsis, 视频时长time, title， 两个文件封面cover[]和video[]' })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cover', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]))
  async UploadCard(@UploadedFiles() files, @Res() res, @Body() body: AddCardDto) {
    try {

      // tslint:disable-next-line: max-line-length
      const arr: any[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
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
                detail: [time, '0观看', '0弹幕'],
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

      return res.status(HttpStatus.BAD_REQUEST).json({ data: '请检查参数是否正确', err: -1 });
    }

  }
}

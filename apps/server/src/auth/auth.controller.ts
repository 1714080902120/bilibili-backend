import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiProperty,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocument } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiProperty({ name: '注册' })
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;
    const uuid = Math.round(50000 + Math.random() * 9949999).toString();
    const identy = {
      uuid,
      uuid_href: `https://m.bilibili.com/space/${uuid}`,
    };
    const baseInfo = {
      bg: {
        name: '',
        src: '',
        href: '',
      },
      logo: {
        name: '',
        src: '',
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
    const user = await this.userModel.create({
      username,
      password,
      identy,
      baseInfo,
      cardList: [],
    });
    return user;
  }

  @Post('login')
  @ApiProperty({ name: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocument) {
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('user')
  @ApiProperty({ name: '获取个人信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async user(@CurrentUser() user: UserDocument) {
    return user;
  }
}

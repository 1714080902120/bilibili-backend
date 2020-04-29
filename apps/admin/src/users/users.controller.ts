import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>) {}
  @Get('option')
  async option() {
    // tslint:disable-next-line: ban-types
    // let uuid = (await this.model.find());
    // return uuid;
    return {
      title: '用户管理',
      column: [
        { prop: 'username', label: '用户名' },
        { prop: 'password', label: '密码', hide: true },
        { prop: 'cover', label: '课程封面图', type: 'upload', width: 120, listType: 'picture-img', row: true, action: 'upload' },
      ]
    };
  }
}

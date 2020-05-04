import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException, Res, HttpStatus } from '@nestjs/common';
import {compareSync} from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    // tslint:disable-next-line: object-literal-key-quotes
    const user = await this.userModel.findOne({ 'username': username }).select('+password');
    if (!user) {
      throw new BadRequestException('用户不存在或用户名不正确', '-1');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('用户密码不正确', '-2');
    }
    return user;
  }
}

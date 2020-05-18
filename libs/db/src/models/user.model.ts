import { prop, modelOptions, DocumentType, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

export type UserDocument = DocumentType<User>;

interface Identy {

  uuid: string;
  uuid_href: string;

}

interface Coin {

  Bcoins: string;
  coins: string;

}

interface FansOrFollows {

  name: string;
  desc: string;
  href: string;
  img: string;

}

interface Fans_Follows {

  fans: FansOrFollows[];
  follows: FansOrFollows[];

}

// tslint:disable-next-line: max-classes-per-file
interface IMG {

  name: string;
  src: string;
  href: string;

}

// tslint:disable-next-line: max-classes-per-file
interface FansFollowsLikes {

  fans: string;
  follows: string;
  likes: string;

}

interface BaseInfo {

  bg: IMG;
  logo: IMG;
  name: string;
  level: string;
  label: string;
  desc: string;
  vip: string;
  fans_follows_likes: FansFollowsLikes;

}

interface Header {

  logo: IMG;
  name: string;
  time: string;

}

interface NewImg {

  src: string;
  href: string;
  name: string;

}

interface Inner {

  head: string | any;
  img: NewImg[];
  detail: string[];
  title: string[];

}

interface Content {

  ellipsis: string;
  inner: Inner;

}

interface Main {

  type: string;
  ellipsis: string;
  content: Content;

}

interface Footer {

  share: string;
  assess: string;
  likes: string;

}

interface Item {

  type: string;
  header: Header;
  main: Main;
  footer: Footer;

}

class Items {

  type: string;
  header: Header;
  main: Main;
  footer: Footer;

}
// tslint:disable-next-line: max-classes-per-file
// class UserInfo {

//   // 身份标识
//   @prop()
//   @ApiProperty({
//     name: '身份标识',
//   })
//   identy: Identy;

//   // 信息
//   @prop()
//   @ApiProperty({
//     name: '基本信息',
//   })
//   baseInfo: BaseInfo;

//   // 作品
//   @prop()
//   @ApiProperty({
//     name: '投稿',
//   })
//   cardList: Item[];

// }

// tslint:disable-next-line: max-classes-per-file
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {

  @ApiProperty({ name: '用户名' })
  @prop()
  username: string;

  @ApiProperty({ name: '密码' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ name: 'uuid等' })
  @prop()
  identy: Identy;

  @ApiProperty({ name: '硬币' })
  @prop()
  coin: Coin;

  @ApiProperty({ name: '基本信息' })
  @prop()
  baseInfo: BaseInfo;

  @ApiProperty({ name: '稿件' })
  @arrayProp({ items: Items })
  cardList: Item[];

  @ApiProperty({ name: '关注/粉丝人信息' })
  // tslint:disable-next-line: variable-name
  fans_follows: Fans_Follows;

}

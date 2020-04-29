import { prop, modelOptions, DocumentType, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

interface Identy {

  uuid: string;
  uuid_href: string;

}

interface IMG {

  name: string;
  src: string;
  href: string;

}

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

interface Item {

  type: string;
  header: {
    logo: IMG;
    name: string;
    time: string;

  };
  main: {
    type: string;
    ellipsis: string;
    content: {
      ellipsis: string;
      inner: {
        head: string;
        img: [];
        detail: [];
        title: [];
      }
    }
  };
  footer: {
    share: string;
    assess: string;
    likes: string;
  };

}

class Items {

  type: string;
  header: {
    logo: IMG;
    name: string;
    time: string;

  };
  main: {
    type: string;
    ellipsis: string;
    content: {
      ellipsis: string;
      inner: {
        head: string;
        img: [];
        detail: [];
        title: [];
      }
    }
  };
  footer: {
    share: string;
    assess: string;
    likes: string;
  };

}

// tslint:disable-next-line: max-classes-per-file
export default class UP {

  // 身份标识
  @prop()
  @ApiProperty({
    name: '身份标识',
  })
  identy: Identy;

  // 信息
  @prop()
  @ApiProperty({
    name: '基本信息',
  })
  baseInfo: BaseInfo;

  // 作品
  @arrayProp({ items: Items })
  @ApiProperty({
    name: '投稿',
  })
  cardList: Item[];

}

import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class HomeSwipe {

  @ApiProperty({ name: 'alt' })
  @prop()
  alt: string;

  @ApiProperty({ name: '本地路径' })
  @prop()
  url: string;

  @ApiProperty({ name: 'name' })
  @prop()
  name: string;

  @ApiProperty({ name: '原始路径' })
  @prop()
  originSrc: string;

}

interface IMG {

  src: string;
  name: string;
  originSrc: string;
  alt: string;

}

interface PeopleFeel {

  like: string | any;
  disLike: string | any;
  coins: string | any;
  collect: string | any;
  share: string | any;

}

interface Info {

  up: string;
  plays: string | any;
  danmaku: string | number;
  time: string | number;

}

interface Video {

  src: string;
  name: string;
  originSrc: string;
  long: string;
  label: string | any;
  danmaku: string[];
  people_feel: PeopleFeel;
  info: Info;

}

interface Up {

  href: string;
  mid: string;

}

interface Detail {

  name: string;
  href: string;
  mid: string;
  logo: string;
  time: string;
  content: string;
  src: string;

}

interface Assess {

  num: string;
  detail: Detail[];

}

// tslint:disable-next-line: max-classes-per-file
export class HomeData {

  @ApiProperty({ name: 'bvid' })
  @prop()
  bvid: string;

  @ApiProperty({ name: 'title' })
  @prop()
  title: string;

  @ApiProperty({ name: 'video_href' })
  @prop()
  video_href: string;

  @ApiProperty({ name: 'plays' })
  @prop()
  plays: string;

  @ApiProperty({ name: 'danmaku' })
  @prop()
  danmaku: string;

  @ApiProperty({ name: '封面cover' })
  @prop()
  img: IMG;

  @ApiProperty({ name: '视频video' })
  @prop()
  video: Video;

  @ApiProperty({ name: 'up信息' })
  @prop()
  up: Up;

  @ApiProperty({ name: '评论' })
  @prop()
  assess: Assess;
}

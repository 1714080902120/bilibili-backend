import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

interface IMG {

  src: string;
  name: string;

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
  long: string;
  label: string | any;
  danmaku: string[];
  people_feel: PeopleFeel;
  info: Info;

}

interface Up {

  username: string;
  name: string;
  mid: string;

}

interface Detail {

  name: string;
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

interface Header {

  logo: IMG;
  name: string;
  time: string;

}

interface NewImg {

  src: string;
  name: string;

}

interface Inner {

  head: string | any;
  img: NewImg[];
  detail: string[];
  title: string;

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

interface VideoPage {

  bvid: string;
  title: string;
  video_href: string;
  plays: string;
  danmaku: string;
  img: IMG;
  video: Video;
  up: Up;
  assess: Assess;

}

export class UploadData {

  @ApiProperty({ name: 'up' })
  @prop()
  up: Up;

  @ApiProperty({ name: 'bvid' })
  @prop()
  bvid: string;

  @ApiProperty({ name: 'card' })
  @prop()
  card: Item;

  @ApiProperty({ name: 'videoPage' })
  @prop()
  videoPage: VideoPage;

}

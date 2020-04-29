import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

export class LiveSwipe {

  @ApiProperty({ name: 'href' })
  @prop()
  href: string;

  @ApiProperty({ name: '原始路径' })
  @prop()
  originSrc: string;

  @ApiProperty({ name: 'name' })
  @prop()
  name: string;

  @ApiProperty({ name: '本地路径' })
  @prop()
  src: string;

}

interface LiveTypes {

  name: string;
  for_more: string;

}

interface IMG {

  src: string;
  name: string;
  originSrc: string;

}

interface Link {

  live_id: string;
  href: string;

}

interface Detail {

  up: string;
  watches: string | any;

}

interface Item {

  live_id: string;
  img: IMG;
  link: Link;
  detail: Detail;
  title: string;

}

// tslint:disable-next-line: max-classes-per-file
export class LiveData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item[];
}

// tslint:disable-next-line: max-classes-per-file
export class LiveFooter {

  @ApiProperty({ name: 'type' })
  @prop()
  type: string;

  @ApiProperty({ name: 'href' })
  @prop()
  href: string;

}

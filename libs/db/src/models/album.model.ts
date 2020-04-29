import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

interface IMG {

  src: string;
  name: string;
  originSrc: string;

}

interface Up {

  logo: IMG;
  name: string;

}

interface Link {

  mid: string;
  href: string;

}

// tslint:disable-next-line: max-classes-per-file
export class AlbumDrawData {

  @ApiProperty({ name: 'link' })
  @prop()
  link: Link;

  @ApiProperty({ name: 'img' })
  @prop()
  img: IMG;

  @ApiProperty({ name: 'up' })
  @prop()
  up: Up;

  @ApiProperty({ name: 'title' })
  @prop()
  title: string;

}

// tslint:disable-next-line: max-classes-per-file
export class AlbumTakeData {

  @ApiProperty({ name: 'link' })
  @prop()
  link: Link;

  @ApiProperty({ name: 'img' })
  @prop()
  img: IMG;

  @ApiProperty({ name: 'up' })
  @prop()
  up: Up;

  @ApiProperty({ name: 'title' })
  @prop()
  title: string;

}

interface UpInfo {

  logo: IMG;
  name: string;
  publish: string;

}

interface Content {

  desc: string;
  img: IMG[];

}

interface Item {

  logo: IMG;
  name: string;
  time: string;
  content: string;
  praise: string | any;

}

interface Assess {

  top_bar: string[];
  items: Item[];

}

// tslint:disable-next-line: max-classes-per-file
export class AlbumDetailDrawData {

  @ApiProperty({ name: 'mid' })
  @prop()
  mid: string;

  @ApiProperty({ name: 'up_info' })
  @prop()
  up_info: UpInfo;

  @ApiProperty({ name: 'Content' })
  @prop()
  content: Content;

  @ApiProperty({ name: 'assess' })
  @prop()
  assess: Assess;

}

// tslint:disable-next-line: max-classes-per-file
export class AlbumDetailTakeData {

  @ApiProperty({ name: 'mid' })
  @prop()
  mid: string;

  @ApiProperty({ name: 'up_info' })
  @prop()
  up_info: UpInfo;

  @ApiProperty({ name: 'Content' })
  @prop()
  content: Content;

  @ApiProperty({ name: 'assess' })
  @prop()
  assess: Assess;

}

import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';

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

  bvid: string;
  href: string;

}

interface Detail {

  watches: string | any;
  danmaku: string | any;

}

interface Item1 {

  live_id: string;
  img: IMG;
  link: Link;
  detail: Detail;
  title: string;

}

interface Item2 {

  bvid: string;
  img: IMG;
  link: Link;
  detail: Detail;
  title: string;

}

// tslint:disable-next-line: max-classes-per-file
export class AnimateData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item1[];

}

// tslint:disable-next-line: max-classes-per-file
export class CartoonData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class DailyData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class DanceData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class DigitalData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class DocumentaryData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item1[];

}

// tslint:disable-next-line: max-classes-per-file
export class FashionData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class FilmData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item1[];

}

// tslint:disable-next-line: max-classes-per-file
export class FunnyData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class GameData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class MovieData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class MusicData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class NationalData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class ScienceData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class SpoofData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

// tslint:disable-next-line: max-classes-per-file
export class TelevData {

  @ApiProperty({ name: 'type类型' })
  @prop()
  type: LiveTypes;

  @ApiProperty({ name: '封面cover' })
  @prop()
  list: Item2[];

}

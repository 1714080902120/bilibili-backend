import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  desc: string;

}

// tslint:disable-next-line: max-classes-per-file
export class PostDto {

  @ApiProperty()
  src: any;

  @ApiProperty()
  name: string;

}

// tslint:disable-next-line: max-classes-per-file
export class AddCardDto {

  @ApiProperty()
  type: string;

  @ApiProperty()
  upname: string;

  @ApiProperty()
  logoSrc: string;

  @ApiProperty()
  logoName: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  ellipsis: string;

  @ApiProperty()
  time: string;

  @ApiProperty()
  title: string;

}

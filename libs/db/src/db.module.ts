import { UploadData } from './models/upload.model';
import { AlbumDrawData, AlbumTakeData, AlbumDetailDrawData, AlbumDetailTakeData } from './models/album.model';
import { LiveSwipe, LiveData, LiveFooter } from './models/live.model';
import { HomeSwipe, HomeData } from './models/home.model';
import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import UP from './models/up.model';
// tslint:disable-next-line: max-line-length
import { AnimateData, CartoonData, DailyData, DanceData, DigitalData, DocumentaryData, FashionData, FilmData, FunnyData, GameData, MovieData, MusicData, NationalData, ScienceData, SpoofData, TelevData } from './models/other.model';

// 导入模型类
const models = TypegooseModule.forFeature(
  [
    { typegooseClass: User, schemaOptions: { collection: 'user_data' } },
    Course,
    Episode,
    { typegooseClass: UP, schemaOptions: { collection: 'up_data' } },
    { typegooseClass: AnimateData, schemaOptions: { collection: 'animate_data' } },
    { typegooseClass: CartoonData, schemaOptions: { collection: 'cartoon_data' } },
    { typegooseClass: DailyData, schemaOptions: { collection: 'daily_data' } },
    { typegooseClass: DanceData, schemaOptions: { collection: 'dance_data' } },
    { typegooseClass: DigitalData, schemaOptions: { collection: 'digital_data' } },
    { typegooseClass: DocumentaryData, schemaOptions: { collection: 'documentary_data' } },
    { typegooseClass: FashionData, schemaOptions: { collection: 'fashion_data' } },
    { typegooseClass: FilmData, schemaOptions: { collection: 'film_data' } },
    { typegooseClass: FunnyData, schemaOptions: { collection: 'funny_data' } },
    { typegooseClass: GameData, schemaOptions: { collection: 'game_data' } },
    { typegooseClass: MovieData, schemaOptions: { collection: 'movie_data' } },
    { typegooseClass: MusicData, schemaOptions: { collection: 'music_data' } },
    { typegooseClass: NationalData, schemaOptions: { collection: 'national_data' } },
    { typegooseClass: ScienceData, schemaOptions: { collection: 'science_data' } },
    { typegooseClass: SpoofData, schemaOptions: { collection: 'spoof_data' } },
    { typegooseClass: TelevData, schemaOptions: { collection: 'telev_data' } },
    { typegooseClass: HomeSwipe, schemaOptions: { collection: 'home_swipe' } },
    { typegooseClass: HomeData, schemaOptions: { collection: 'home_recommend_2' } },
    { typegooseClass: LiveSwipe, schemaOptions: { collection: 'live_swipe' } },
    { typegooseClass: LiveData, schemaOptions: { collection: 'live_data' } },
    { typegooseClass: LiveFooter, schemaOptions: { collection: 'live_footer' } },
    { typegooseClass: AlbumDrawData, schemaOptions: { collection: 'album_draw_data' } },
    { typegooseClass: AlbumTakeData, schemaOptions: { collection: 'album_take_data' } },
    { typegooseClass: AlbumDetailDrawData, schemaOptions: { collection: 'album_detail_draw_data' } },
    { typegooseClass: AlbumDetailTakeData, schemaOptions: { collection: 'album_detail_take_data' } },
    { typegooseClass: UploadData, schemaOptions: { collection: 'upload_data' } },
  ]);

@Global()
@Module({
  // 使用插件
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        };
      },
    }),
    // TypegooseModule.forRoot(process.env.DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }

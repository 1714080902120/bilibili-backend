import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { LiveModule } from './live/live.module';
import { UpModule } from './up/up.module';
import { AnimateModule } from './animate/animate.module';
import { CartoonModule } from './cartoon/cartoon.module';
import { DailyModule } from './daily/daily.module';
import { DanceModule } from './dance/dance.module';
import { DigitalModule } from './digital/digital.module';
import { DocumentaryModule } from './documentary/documentary.module';
import { FashionModule } from './fashion/fashion.module';
import { FilmModule } from './film/film.module';
import { FunnyModule } from './funny/funny.module';
import { GameModule } from './game/game.module';
import { MovieModule } from './movie/movie.module';
import { MusicModule } from './music/music.module';
import { NationalModule } from './national/national.module';
import { ScienceModule } from './science/science.module';
import { SpoofModule } from './spoof/spoof.module';
import { TelevModule } from './telev/telev.module';
import { AlbumModule } from './album/album.module';

@Module({
  controllers: [],
  // tslint:disable-next-line: max-line-length
  imports: [UserModule, HomeModule, LiveModule, UpModule, AnimateModule, CartoonModule, DailyModule, DanceModule, DigitalModule, DocumentaryModule, FashionModule, FilmModule, FunnyModule, GameModule, MovieModule, MusicModule, NationalModule, ScienceModule, SpoofModule, TelevModule, AlbumModule],
})
export class YutuModule {}

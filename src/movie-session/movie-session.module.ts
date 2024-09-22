import { Module } from '@nestjs/common';
import { MovieSessionController } from './movie-session.controller';
import { MovieSessionService } from './movie-session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSession } from './movie-session.entity';
import { Movie } from '../movie/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieSession, Movie])],
  controllers: [MovieSessionController],
  providers: [MovieSessionService],
})
export class MovieSessionModule {}

import { Module } from '@nestjs/common';
import { MovieSessionController } from './movie-session.controller';
import { MovieSessionService } from './movie-session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSession } from './movie-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieSession])],
  controllers: [MovieSessionController],
  providers: [MovieSessionService],
})
export class MovieSessionModule {}

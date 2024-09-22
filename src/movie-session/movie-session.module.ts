import { Module } from '@nestjs/common';
import { MovieSessionController } from './movie-session.controller';
import { MovieSessionService } from './session.service';

@Module({
  controllers: [MovieSessionController],
  providers: [MovieSessionService],
})
export class MovieSessionModule {}

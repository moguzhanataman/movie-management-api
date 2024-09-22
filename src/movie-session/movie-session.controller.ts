import { MovieSessionService } from './movie-session.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';

@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @Post()
  createSession(@Body() createSessionDto: CreateMovieSessionDto) {
    this.movieSessionService.createSession(createSessionDto);
  }
}

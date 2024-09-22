import { MovieSessionService } from './movie-session.service';
import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';
import { DeleteMovieSessionDto } from './dto/delete-movie-session.dto';

@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @Post()
  createSession(@Body() createSessionDto: CreateMovieSessionDto) {
    this.movieSessionService.create(createSessionDto);
  }

  @Delete()
  deleteSession(@Body() deleteSessionDto: DeleteMovieSessionDto) {
    this.movieSessionService.delete(deleteSessionDto.id);
  }
}

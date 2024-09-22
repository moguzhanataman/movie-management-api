import { MovieSessionService } from './movie-session.service';
import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';
import { DeleteMovieSessionDto } from './dto/delete-movie-session.dto';
import { ManagerGuard } from '../auth/manager.guard';

@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @UseGuards(ManagerGuard)
  @Post()
  createSession(@Body() createSessionDto: CreateMovieSessionDto) {
    this.movieSessionService.create(createSessionDto);
  }

  @UseGuards(ManagerGuard)
  @Delete()
  deleteSession(@Body() deleteSessionDto: DeleteMovieSessionDto) {
    this.movieSessionService.delete(deleteSessionDto.id);
  }
}

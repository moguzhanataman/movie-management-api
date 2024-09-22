import { MovieSessionService } from './movie-session.service';
import { Body, Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';
import { DeleteMovieSessionDto } from './dto/delete-movie-session.dto';
import { ManagerGuard } from '../auth/manager.guard';

@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @UseGuards(ManagerGuard)
  @Post()
  @HttpCode(201)
  async createSession(@Body() createSessionDto: CreateMovieSessionDto) {
    await this.movieSessionService.create(createSessionDto);
  }

  @UseGuards(ManagerGuard)
  @Delete()
  deleteSession(@Body() deleteSessionDto: DeleteMovieSessionDto) {
    this.movieSessionService.delete(deleteSessionDto.id);
  }
}

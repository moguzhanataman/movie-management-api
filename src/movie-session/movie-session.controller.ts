import { MovieSessionService } from './movie-session.service';
import { Body, Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-movie-session.dto';
import { DeleteMovieSessionDto } from './dto/delete-movie-session.dto';
import { ManagerGuard } from '../auth/manager.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('movie session')
@UseGuards(ManagerGuard)
@Controller('movie-session')
export class MovieSessionController {
  constructor(private readonly movieSessionService: MovieSessionService) {}

  @Post()
  @HttpCode(201)
  async createSession(@Body() createSessionDto: CreateMovieSessionDto) {
    await this.movieSessionService.create(createSessionDto);
  }

  @Delete()
  deleteSession(@Body() deleteSessionDto: DeleteMovieSessionDto) {
    this.movieSessionService.delete(deleteSessionDto.id);
  }
}

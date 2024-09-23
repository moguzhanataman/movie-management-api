import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ManagerGuard } from '../auth/manager.guard';
import { CustomerGuard } from '../auth/customer.guard';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({ summary: 'Public API. List of movies with available sessions information' })
  @Get()
  async movieList() {
    return this.movieService.getAll();
  }

  @ApiOperation({ summary: 'Given ticketId, flag movie as watched' })
  @UseGuards(CustomerGuard)
  @Post('/watch/:ticketId')
  @HttpCode(204)
  async watchMovie(@Req() req: Request, @Param('ticketId') ticketId: string) {
    return this.movieService.watchMovie(req.user.id, Number(ticketId));
  }

  @ApiOperation({ summary: 'User watch history' })
  @UseGuards(CustomerGuard)
  @Get('/watched')
  async listWatchedMovies(@Req() req: Request) {
    return this.movieService.listWatchedMovies(req.user.id);
  }

  @ApiOperation({
    summary:
      'Adds movie. After adding a movie, to enable purchasing tickets, manager must create sessions with room and timeSlot information',
  })
  @UseGuards(ManagerGuard)
  @Post()
  async addMovie(@Body() addMovieDto: AddMovieDto) {
    return this.movieService.addMovie(addMovieDto.name, addMovieDto.ageRestriction);
  }

  @ApiOperation({ summary: 'Soft deletes movie' })
  @UseGuards(ManagerGuard)
  @Delete()
  @HttpCode(204)
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    await this.movieService.deleteMovie(deleteMovieDto.id);
  }

  @ApiOperation({ summary: 'Update movie name or ageRestriction options' })
  @UseGuards(ManagerGuard)
  @Patch()
  async updateMovie(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie({
      id: updateMovieDto.id,
      name: updateMovieDto.name,
      ageRestriction: updateMovieDto.ageRestriction,
    });
  }
}

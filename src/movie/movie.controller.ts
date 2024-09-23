import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ManagerGuard } from '../auth/manager.guard';
import { CustomerGuard } from '../auth/customer.guard';
import { Request } from 'express';
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async movieList() {
    return this.movieService.getAll();
  }

  @UseGuards(CustomerGuard)
  @Post('/watch/:ticketId')
  @HttpCode(204)
  async watchMovie(@Req() req: Request, @Param('ticketId') ticketId: string) {
    return this.movieService.watchMovie(req.user.id, Number(ticketId));
  }

  @UseGuards(CustomerGuard)
  @Get('/watched')
  async listWatchedMovies(@Req() req: Request) {
    return this.movieService.listWatchedMovies(req.user.id);
  }

  @UseGuards(ManagerGuard)
  @Post()
  async addMovie(@Body() addMovieDto: AddMovieDto) {
    return this.movieService.addMovie(addMovieDto.name, addMovieDto.ageRestriction);
  }

  @UseGuards(ManagerGuard)
  @Delete()
  @HttpCode(204)
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    await this.movieService.deleteMovie(deleteMovieDto.id);
  }

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

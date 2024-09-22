import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ManagerGuard } from 'src/auth/manager.guard';
import { CustomerGuard } from 'src/auth/customer.guard';
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
  async watchMovie(@Req() req: Request) {
    console.log(req.user);

    // this.movieService.watchMovie();
    return 'ok';
  }

  @UseGuards(ManagerGuard)
  @Post()
  async addMovie(@Body() addMovieDto: AddMovieDto) {
    return this.movieService.addMovie(addMovieDto.name, addMovieDto.ageRestriction);
  }

  @UseGuards(ManagerGuard)
  @Delete()
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    return this.movieService.deleteMovie(deleteMovieDto.id);
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

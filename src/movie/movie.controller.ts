import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { DeleteMovieDto } from './dto/delete-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async movieList() {
    return this.movieService.getAll();
  }

  @Post()
  async addMovie(@Body() addMovieDto: AddMovieDto) {
    return this.movieService.addMovie(
      addMovieDto.name,
      addMovieDto.ageRestriction,
    );
  }

  @Delete()
  async deleteMovie(@Body() deleteMovieDto: DeleteMovieDto) {
    return this.movieService.deleteMovie(deleteMovieDto.id);
  }

  @Patch()
  async updateMovie(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie({
      id: updateMovieDto.id,
      name: updateMovieDto.name,
      ageRestriction: updateMovieDto.ageRestriction,
    });
  }
}

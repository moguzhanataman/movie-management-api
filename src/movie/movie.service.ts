import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  getAll() {
    return this.moviesRepository.findBy({ deleted: false });
  }

  async addMovie(name: string, ageRestriction: number) {
    const m = new Movie();
    m.name = name;
    m.ageRestriction = ageRestriction;
    return this.moviesRepository.save(m);
  }

  async deleteMovie(id: number) {
    return this.moviesRepository.update({ id }, { deleted: true });
  }
}

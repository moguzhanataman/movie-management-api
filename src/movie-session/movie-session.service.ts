import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/movie/movie.entity';
import { Repository } from 'typeorm';
import { BusinessErrors, GeneralErrors } from '../_errors/errors';
import { MovieSession } from './movie-session.entity';

@Injectable()
export class MovieSessionService {
  constructor(
    @InjectRepository(MovieSession)
    private readonly movieSessionRepository: Repository<MovieSession>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async create(sessionDetails: Partial<MovieSession>) {
    const movieExists = await this.movieRepository.existsBy({ id: sessionDetails.movieId });

    if (!movieExists) {
      throw new NotFoundException(BusinessErrors.Session.MovieNotFound);
    }

    const ms = new MovieSession();

    ms.date = sessionDetails.date;
    ms.movieId = sessionDetails.movieId;
    ms.room = sessionDetails.room;
    ms.timeSlot = sessionDetails.timeSlot;

    return this.movieSessionRepository.save(ms);
  }

  async delete(id: number) {
    this.movieSessionRepository.update({ id }, { deleted: true });
  }
}

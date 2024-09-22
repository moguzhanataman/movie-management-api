import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { MovieSession } from './movie-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeneralErrors } from '../_errors/errors';

@Injectable()
export class MovieSessionService {
  constructor(
    @InjectRepository(MovieSession)
    private readonly movieSessionRepository: Repository<MovieSession>,
  ) {}

  async create(sessionDetails: Partial<MovieSession>) {
    try {
      const ms = new MovieSession();

      ms.date = sessionDetails.date;
      ms.movieId = sessionDetails.movieId;
      ms.room = sessionDetails.room;
      ms.timeSlot = sessionDetails.timeSlot;

      return this.movieSessionRepository.save(ms);
    } catch (e) {
      Logger.error(e);
      throw new InternalServerErrorException(GeneralErrors.DBError);
    }
  }

  async delete(id: number) {
    this.movieSessionRepository.update({ id }, { deleted: true });
  }
}

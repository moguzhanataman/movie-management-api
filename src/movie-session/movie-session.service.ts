import { Injectable } from '@nestjs/common';
import { MovieSession } from './movie-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MovieSessionService {
  constructor(
    @InjectRepository(MovieSession)
    private readonly movieSessionRepository: Repository<MovieSession>,
  ) {}

  async create(sessionDetails: Partial<MovieSession>) {
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

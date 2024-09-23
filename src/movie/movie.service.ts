import { AddMovieDto } from './dto/add-movie.dto';
import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Ticket } from '../ticket/ticket.entity';
import { BusinessErrors } from '../_errors/errors';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  getAll() {
    return this.moviesRepository.find({ where: { deleted: false }, relations: ['sessions'] });
  }

  async addMovie(addMovieDto: AddMovieDto) {
    const m = new Movie();
    m.name = addMovieDto.name;
    m.ageRestriction = addMovieDto.ageRestriction;

    if (addMovieDto.room != null && addMovieDto?.timeSlots?.length > 0) {
      // Add sessions also
      // TODO: check if room is booked for given timeslots
    }
    return this.moviesRepository.save(m);
  }

  async deleteMovie(id: number) {
    const deleteResult = await this.moviesRepository.update({ id }, { deleted: true });
    if (deleteResult.affected == 0) {
      throw new InternalServerErrorException('cant delete movie');
    }
  }

  async updateMovie(movie: Partial<Movie>) {
    const m = await this.moviesRepository.findOneBy({ id: movie.id });
    if (movie.ageRestriction != null) {
      m.ageRestriction = movie.ageRestriction;
    }

    if (movie.name != null) {
      m.name = movie.name;
    }

    await this.moviesRepository.save(m);

    return m;
  }

  async watchMovie(userId: number, ticketId: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: ticketId },
      relations: ['user', 'movieSession'],
    });

    if (ticket == null) {
      throw new NotFoundException(BusinessErrors.Ticket.NotFound);
    }

    if (ticket.user.id !== userId) {
      throw new UnauthorizedException(BusinessErrors.Ticket.NotMyTicket);
    }

    ticket.watched = true;
    await this.ticketRepository.save(ticket);
  }

  async listWatchedMovies(userId: number) {
    const tickets = (await this.ticketRepository.find({ where: { userId }, relations: ['movieSession.movie'] })) || [];

    return tickets.map((t) => t.movieSession.movie.name);
  }
}

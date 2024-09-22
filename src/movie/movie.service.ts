import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { BusinessErrors } from 'src/_errors/errors';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
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
    const deleteResult = await this.moviesRepository.update({ id }, { deleted: true });
    if (deleteResult.affected > 0) {
      return { message: 'movie deleted' };
    } else {
      throw new InternalServerErrorException('cant delete movie');
    }
  }

  async updateMovie(movie: Partial<Movie>) {
    return this.moviesRepository.update({ id: movie.id }, { name: movie.name, ageRestriction: movie.ageRestriction });
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

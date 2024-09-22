import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { BusinessErrors, GeneralErrors } from 'src/errors/errors';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async buyTicket(userId: number, movieId: number, room: number, date: Date, timeSlot: string) {
    const movieExists = await this.movieRepository.findOneBy({ id: movieId });
    const userExists = await this.userRepository.existsBy({ id: userId });

    if (movieExists == null) {
      throw new BadRequestException(BusinessErrors.Ticket.MovieNotExists);
    }

    if (movieExists.deleted) {
      throw new BadRequestException(BusinessErrors.Ticket.MovieDeleted);
    }

    if (!userExists) {
      throw new BadRequestException(BusinessErrors.Ticket.UserNotExists);
    }

    const t = new Ticket();
    t.userId = userId;
    t.movieId = movieId;
    t.room = room;
    t.date = date;
    t.timeSlot = timeSlot;

    try {
      this.ticketRepository.save(t);
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(GeneralErrors.DBError);
    }
  }
}

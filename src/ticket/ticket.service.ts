import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Movie } from '../movie/movie.entity';
import { User } from '../user/user.entity';
import { BusinessErrors, GeneralErrors } from '../_errors/errors';
import { MovieSession } from '../movie-session/movie-session.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MovieSession)
    private readonly sessionRepository: Repository<MovieSession>,
  ) {}

  async buyTicket(userId: number, sessionId: number) {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: ['movie'],
    });

    if (session == null) {
      throw new NotFoundException(BusinessErrors.Ticket.MovieSessionNotFound);
    }

    const movieExists = session.movie;
    const userExists = await this.userRepository.existsBy({ id: userId });

    if (movieExists == null) {
      throw new NotFoundException(BusinessErrors.Ticket.MovieNotFound);
    }

    if (movieExists.deleted) {
      throw new BadRequestException(BusinessErrors.Ticket.MovieDeleted);
    }

    if (!userExists) {
      throw new NotFoundException(BusinessErrors.Ticket.UserNotFound);
    }

    const t = new Ticket();
    t.userId = userId;
    t.movieSessionId = session.id;

    try {
      this.ticketRepository.save(t);
    } catch (e) {
      Logger.log(e);
      throw new InternalServerErrorException(GeneralErrors.DBError);
    }
  }
}

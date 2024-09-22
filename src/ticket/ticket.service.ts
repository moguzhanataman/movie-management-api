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
import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { BusinessErrors, GeneralErrors } from 'src/_errors/errors';
import { MovieSession } from 'src/movie-session/movie-session.entity';

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

    console.log({ session });

    const movieExists = await this.movieRepository.findOneBy({ id: session.movieId });
    const userExists = await this.userRepository.existsBy({ id: userId });

    if (movieExists == null) {
      throw new NotFoundException(BusinessErrors.Ticket.MovieNotExists);
    }

    if (movieExists.deleted) {
      throw new BadRequestException(BusinessErrors.Ticket.MovieDeleted);
    }

    if (!userExists) {
      throw new NotFoundException(BusinessErrors.Ticket.UserNotExists);
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

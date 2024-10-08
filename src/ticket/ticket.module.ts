import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { Movie } from '../movie/movie.entity';
import { User } from '../user/user.entity';
import { MovieSession } from '../movie-session/movie-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Movie, User, MovieSession])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}

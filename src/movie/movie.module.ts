import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Ticket } from '../ticket/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Ticket])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}

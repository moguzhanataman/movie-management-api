import { ExecutionContext } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../src/movie/movie.entity';
import { User } from '../src/user/user.entity';
import { UserTypes } from '../src/_constants/user-types';
import { Repository } from 'typeorm';
import { MovieSession } from '../src/movie-session/movie-session.entity';
import { Ticket } from '../src/ticket/ticket.entity';

export const TestingDatabase = TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: ':memory:',
  autoLoadEntities: true,
  synchronize: true,
});

export const ManagerGuardOverride = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      id: 1,
      username: 'admin',
      userType: 'manager',
    };
    return true;
  },
};

export const CustomerGuardOverride = {
  canActivate: (context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    req.user = {
      id: 2,
      username: 'john doe',
      userType: 'customer',
    };
    return true;
  },
};

export async function seedTestDatabase(moduleFixture: TestingModule) {
  const movieRepo: Repository<Movie> = moduleFixture.get('MovieRepository');
  const ticketRepo: Repository<Ticket> = moduleFixture.get('TicketRepository');
  const movieSessionRepo: Repository<MovieSession> = moduleFixture.get('MovieSessionRepository');
  const userRepo: Repository<User> = moduleFixture.get('UserRepository');

  const manager = new User();
  manager.id = 1;
  manager.username = 'admin';
  manager.password = 'admin';
  manager.userType = UserTypes.manager;
  manager.age = 100;

  const customer = new User();
  customer.id = 2;
  customer.username = 'john doe';
  customer.password = '123';
  customer.userType = UserTypes.customer;
  customer.age = 20;

  await userRepo.save([manager, customer]);

  const m = new Movie();
  m.id = 1;
  m.name = 'Test Movie 1';
  m.ageRestriction = 0;
  await movieRepo.save(m);

  const ms = new MovieSession();
  ms.date = new Date();
  ms.room = 1;
  ms.timeSlot = '10:00-12:00';
  ms.movieId = m.id;

  const ms2 = new MovieSession();
  ms2.date = new Date();
  ms2.room = 2;
  ms2.timeSlot = '12:00-14:00';
  ms2.movieId = m.id;
  await movieSessionRepo.save([ms, ms2]);

  const t = new Ticket();
  t.id = 1;
  t.movieSessionId = ms.id;
  t.userId = customer.id;
  await ticketRepo.save(t);

  const movies = await movieRepo.find({});
}

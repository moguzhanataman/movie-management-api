import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  movieId: number;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn()
  movie: Movie;

  room: number;

  @Column()
  date: Date;

  @Column()
  timeSlot: string;

  @Column({ default: false })
  watched: boolean;
}

export const TimeSlots = [
  '10:00-12:00',
  '12:00-14:00',
  '14:00-16:00',
  '16:00-18:00',
  '18:00-20:00',
  '20:00-22:00',
  '22:00-00:00',
];

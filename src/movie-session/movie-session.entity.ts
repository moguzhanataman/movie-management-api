import { Movie } from 'src/movie/movie.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieSession {
  @PrimaryGeneratedColumn()
  id: number;

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
}

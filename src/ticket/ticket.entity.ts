import { Movie } from 'src/movie/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  //   @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.id)
  movie: Movie;

  @Column()
  date: Date;

  @Column()
  timeSlot: string;

  @Column({ default: false })
  watched: boolean;
}

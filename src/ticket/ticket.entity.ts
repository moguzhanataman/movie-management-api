import { MovieSession } from '../movie-session/movie-session.entity';
import { User } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  movieSessionId: number;

  @ManyToOne(() => MovieSession, (session) => session.id)
  @JoinColumn()
  movieSession: MovieSession;

  @Column({ default: false })
  watched: boolean;
}

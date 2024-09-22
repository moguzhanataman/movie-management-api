import { MovieSession } from 'src/movie-session/movie-session.entity';
import { User } from 'src/user/user.entity';
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
  sessionId: number;

  @ManyToOne(() => MovieSession, (session) => session.id)
  @JoinColumn()
  session: MovieSession;

  @Column({ default: false })
  watched: boolean;
}

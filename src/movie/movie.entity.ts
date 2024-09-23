import { MovieSession } from '../movie-session/movie-session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  ageRestriction: number;

  @Column({ default: false })
  deleted: boolean;

  @OneToMany(() => MovieSession, (s) => s.movie)
  sessions: MovieSession[];
}

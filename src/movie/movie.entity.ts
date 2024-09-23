import { MovieSession } from '../movie-session/movie-session.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: string; // This could be 'manager' or 'customer'

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}

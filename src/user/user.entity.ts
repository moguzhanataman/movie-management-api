import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from './user-type.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'user_type_id' })
  userType: UserType;
}

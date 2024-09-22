import { User } from './user.entity';

export interface UserToken extends Omit<User, 'password'> {
  iat: number;
  exp: number;
}

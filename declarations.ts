import { UserToken } from 'src/user/user.token';

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

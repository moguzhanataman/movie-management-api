import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Errors } from 'src/errors/errors';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async registerUser(username: string, password: string, age: number) {
    const user = await this.usersRepository.findOneBy({ username });

    // User exists
    if (user != null) {
      throw new BadRequestException(Errors.Auth.UserExists);
    }

    const u = new User();
    u.username = username;
    u.password = password;
    u.age = age;
    this.usersRepository.save(u);

    console.log({ user, password, age });
  }

  async loginUser() {}
}

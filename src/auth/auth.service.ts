import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessErrors } from 'src/errors/errors';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, age: number) {
    const user = await this.usersRepository.findOneBy({ username });

    // User exists
    if (user != null) {
      throw new BadRequestException(BusinessErrors.Auth.UserExists);
    }

    const u = new User();
    u.username = username;
    u.password = password;
    u.age = age;
    this.usersRepository.save(u);

    console.log({ user, password, age });
  }

  async login(username: string, password: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      userType: user.userType,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

import { UserTypes } from './../_constants/user-types';
import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessErrors } from '../_errors/errors';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, age: number, userType: string) {
    const user = await this.usersRepository.findOneBy({ username });

    // User exists
    if (user != null) {
      throw new BadRequestException(BusinessErrors.Auth.UserExists);
    }

    const u = new User();
    u.username = username;
    u.password = password;
    u.age = age;
    if (userType != null) {
      u.userType = userType;
    }
    this.usersRepository.save(u);
  }

  async login(username: string, password: string) {
    try {
      const user = await this.usersRepository.findOneBy({ username });
      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
      const payload = {
        id: user.id,
        username: user.username,
        age: user.age,
        userType: user.userType,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (e) {
      Logger.error(e);
      throw new UnauthorizedException();
    }
  }
}

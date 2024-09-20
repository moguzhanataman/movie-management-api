import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from 'src/user/user-type.entity';
import { User } from 'src/user/user.entity';
import { AuthenticationController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],
  controllers: [AuthenticationController],
  providers: [AuthService],
})
export class AuthModule {}

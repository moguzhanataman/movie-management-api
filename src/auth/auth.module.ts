import { Module } from '@nestjs/common';
import { AuthenticationController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthService],
})
export class AuthModule {}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return 'ok';
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.registerUser(
      registerDto.username,
      registerDto.password,
      registerDto.age,
    );
  }
}

import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login() {
    return 'ok';
  }

  @Post('register')
  async register() {
    await this.authService.registerUser('oguzhan', '123', 18);
  }
}

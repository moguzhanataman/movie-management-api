import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  @Post('login')
  login() {
    return 'ok';
  }

  @Post('register')
  register() {
    return 'ok';
  }
}

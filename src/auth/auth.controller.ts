import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('session')
  async login(@Body() body, @Res() response, @Req() req) {
    const idToken = body?.idToken?.toString();
    const csrfToken = body?.csrfToken?.toString();

    if (csrfToken !== req.cookies?.csrfToken) {
      response.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }

    const days: number = 7;
    const expiresIn = 60 * 60 * 24 * days * 1000;
    try {
      const sessionCookie = await this.authService.sessionLogin(idToken, expiresIn);
      if (!!sessionCookie) {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        response.cookie('session', sessionCookie, options);
        response.end(JSON.stringify({ status: 'success' }));
      }
    }
    catch (e) {
      response.status(401).send('UNAUTHORIZED REQUEST!');
    }
  }
}
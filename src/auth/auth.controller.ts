import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('sign')
  async sign(@Body() body, @Res() response) {
    try {
      const data = await this.authService.login(body);
      if(data)
      response.status(200).send({
        status: 'success',
        code: 200,
        data
      });
      else{
        response.status(400).send("USER NOT FOUND!")
      }
    }
    catch (e) {
      console.log(e.message);
      response.status(401).send('UNAUTHORIZED REQUEST!');
    }
  }
}
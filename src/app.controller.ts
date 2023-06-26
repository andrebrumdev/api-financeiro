import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('firebase-aut h'))
  @Get('/hello')
  getHello(@Req() resquest: Request){
    return 'JWT => '+ JSON.stringify(resquest['user'] + ' ;')
  }

  @Get('login')
  @Render('login')
  login() {
    return;
  }

  @Get('signup')
  @Render('signup')
  signup() {
    return;
  }
}

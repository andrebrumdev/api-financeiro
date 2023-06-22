import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesController } from './transacoes/transacoes.controller';
import { TransacoesService } from './transacoes/transacoes.service';
import { BankService } from './bank/bank.service';
import { BankController } from './bank/bank.controller';
import { Repository } from './repository';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthStrategy } from './auth/auth.strategy';
import { PreauthMiddleware } from './preauth.middleware';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, TransacoesController, BankController],
  providers: [AppService, TransacoesService, BankService, Repository,AuthStrategy],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    })
  }
  
}

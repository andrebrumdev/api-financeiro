import { Module, NestModule, MiddlewareConsumer, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankService } from './bank/bank.service';
import { BankController } from './bank/bank.controller';
import { Repository } from './repository';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthStrategy } from './auth/auth.strategy';
import { PreauthMiddleware } from './preauth.middleware';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database/data-source';

@Module({
  imports: [UserModule, AuthModule, TransactionModule ],
  controllers: [AppController,  BankController],
  providers: [AppService, BankService, Repository, AuthStrategy ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(PreauthMiddleware).forRoutes({
      path: '*', method: RequestMethod.ALL
    })
  }
  
}

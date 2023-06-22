import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransacoesController } from './transacoes/transacoes.controller';
import { TransacoesService } from './transacoes/transacoes.service';
import { BankService } from './bank/bank.service';
import { BankController } from './bank/bank.controller';
import { Repository } from './repository';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, TransacoesController, BankController],
  providers: [AppService, TransacoesService, BankService, Repository],
})
export class AppModule {}

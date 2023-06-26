import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './transaction.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Transaction] ) ],
  controllers: [TransactionController],
  providers: [ ...transactionProviders, TransactionService],
  exports: [ TypeOrmModule ]
})
export class TransactionModule {}

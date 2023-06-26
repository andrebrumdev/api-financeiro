import { DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import constants from '../constants';

export const transactionProviders = [
  {
    provide: "TRANSACTION_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Transaction),
    inject: ["DATA_SOURCE"],
  },
];
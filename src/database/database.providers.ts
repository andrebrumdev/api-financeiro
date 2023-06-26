import constants from 'src/constants';
import {dataSource} from './data-source';


export const databaseProviders = [
    {
      provide: "DATA_SOURCE",
      useFactory: async () => {  
        return dataSource.initialize();
      },
    },
  ];

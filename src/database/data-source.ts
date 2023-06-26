import { DataSource, DataSourceOptions } from "typeorm";

const config : DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    driver: 'mysql',
    username: 'root',
    password: 'root',
    database: 'carteiraBrum',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
};

const dataSource = new DataSource(config);

export {dataSource,config};
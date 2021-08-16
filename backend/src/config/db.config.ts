import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent',
    password: process.env.POSTGRES_PASSWORD || 'H0use_rent@rent',
    logging: true,
    synchronize: true,
};

export default dbConfig;

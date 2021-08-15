import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    host: process.env.DATABASE_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: true,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
};

export default dbConfig;

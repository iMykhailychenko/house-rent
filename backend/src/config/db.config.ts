import { ConnectionOptions } from 'typeorm';
import path from 'path';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_test',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_test',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_test',
    logging: true,
    synchronize: false,
    entities: [path.join(__dirname, '..', '**', '*.entity{.js,.ts}')],
    migrations: [path.join(__dirname, '..', 'migrations', '**', '*{.js,.ts}')],
    cli: {
        migrationsDir: path.join(__dirname, '..', 'migrations'),
    },
};

export default dbConfig;

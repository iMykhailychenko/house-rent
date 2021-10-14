import { ConnectionOptions } from 'typeorm';

import { join } from 'path';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_test',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_test',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_test',
    logging: false,
    synchronize: false,
    migrationsRun: true,
    entities: [join('src', '**', '*.entity.{ts,js}')],
    migrations: [join('migrations', '**', '*.{ts,js}')],
    cli: {
        migrationsDir: 'migrations',
    },
};

export default dbConfig;

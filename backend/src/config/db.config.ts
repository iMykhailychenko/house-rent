import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_test',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_test',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_test',
    logging: true,
    synchronize: false,
    migrationsRun: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'migrations',
    },
};

export default dbConfig;

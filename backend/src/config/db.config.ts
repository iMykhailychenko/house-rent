import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../api/users/entity/users.entity';

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_dev',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_dev',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_dev',
    logging: true,
    synchronize: true,
    entities: [User],
};

export default dbConfig;

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../api/users/users.entity';
import { Post } from '../api/posts/posts.entity';
import { Chat } from '../api/chat/chat.entity';
import { Favorite } from '../api/favorite/favorite.entity';

const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_test',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_test',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_test',
    logging: false,
    synchronize: true,
    entities: [User, Post, Chat, Favorite],
};

export default dbConfig;

import { ConnectionOptions } from 'typeorm';

import { ChatEntity } from '../api/chats/entities/chats.entity';
import { MessageEntity } from '../api/chats/entities/messages.entity';
import { FavoriteEntity } from '../api/favorite/entities/favorite.entity';
import { NotificationsEntity } from '../api/notifications/entities/notifications.entity';
import { PostEntity } from '../api/posts/entities/posts.entity';
import { RatingEntity } from '../api/rating/entities/rating.entity';
import { UserEntity } from '../api/users/entities/users.entity';

export const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'house_rent_dev',
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'house_rent_dev',
    password: process.env.POSTGRES_PASSWORD || 'house_rent_dev',
    logging: false,
    synchronize: true,
    entities: [UserEntity, PostEntity, FavoriteEntity, ChatEntity, MessageEntity, NotificationsEntity, RatingEntity],

    // TODO before prod update db with migrations
    // migrationsRun: true,
    // migrations: [join('migrations', '**', '*.{ts,js}')],
    // cli: {
    //     migrationsDir: 'migrations',
    // },
};

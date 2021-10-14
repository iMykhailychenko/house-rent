import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsModule } from './api/chats/chats.module';
import { FavoriteModule } from './api/favorite/favorite.module';
import { MediaModule } from './api/media/media.module';
import { PostsModule } from './api/posts/posts.module';
import { UsersModule } from './api/users/users.module';
import dbConfig from './config/db.config';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
    imports: [TypeOrmModule.forRoot(dbConfig), FavoriteModule, MediaModule, PostsModule, UsersModule, ChatsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}

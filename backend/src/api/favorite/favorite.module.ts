import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { NotificationsModule } from '../notifications/notifications.module';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { FavoriteEntity } from './entities/favorite.entity';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
    imports: [TypeOrmModule.forFeature([FavoriteEntity, UserEntity, PostEntity]), NotificationsModule],
    controllers: [FavoriteController],
    providers: [FavoriteService, AuthGuard],
})
export class FavoriteModule {}

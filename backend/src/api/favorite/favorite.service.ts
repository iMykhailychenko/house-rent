import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotificationsType } from '../notifications/notifications.interface';
import { NotificationsService } from '../notifications/notifications.service';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { FavoriteEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
    constructor(
        @InjectRepository(FavoriteEntity) private readonly favoriteRepository: Repository<FavoriteEntity>,
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly notificationsService: NotificationsService,
    ) {}

    async toggleFavorite(userId: number, postId: number): Promise<void> {
        const post = await this.postRepository.findOne(postId, { relations: ['user'] });

        const favorite = await this.favoriteRepository.findOne({
            where: {
                post: postId,
                user: userId,
            },
        });

        if (favorite) {
            await this.favoriteRepository.delete(favorite);
        } else {
            const user = await this.userRepository.findOne(userId);

            const favorite = new FavoriteEntity();
            favorite.post = post;
            favorite.user = user;

            await this.notificationsService.createNotification({
                userId: user.id,
                postId: post.id,
                recipientId: post.user.id,
                type: NotificationsType.NEW_FAVORITE,
            });

            await this.favoriteRepository.save(favorite);
        }
    }
}

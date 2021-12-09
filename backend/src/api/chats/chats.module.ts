import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { JwtModule } from '../../shared/jwt/jwt.module';
import { NotificationsEntity } from '../notifications/entities/notifications.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { PostEntity } from '../posts/entities/posts.entity';
import { UserEntity } from '../users/entities/users.entity';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity } from './entities/chats.entity';
import { MessageEntity } from './entities/messages.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity, PostEntity, NotificationsEntity]),
        HttpModule,
        JwtModule,
        NotificationsModule,
    ],
    controllers: [ChatsController],
    providers: [ChatsService, AuthGuard],
    exports: [ChatsService],
})
export class ChatsModule {}

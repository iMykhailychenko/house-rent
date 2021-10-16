import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../guards/auth.guards';
import { UserEntity } from '../users/entities/users.entity';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity } from './entities/chats.entity';
import { MessageEntity } from './entities/messages.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity])],
    controllers: [ChatsController],
    providers: [ChatsService, AuthGuard],
})
export class ChatsModule {}

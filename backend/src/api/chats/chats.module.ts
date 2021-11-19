import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { JwtService } from '../../shared/jwt/jwt.service';
import { SecurityService } from '../security/security.service';
import { UserEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity } from './entities/chats.entity';
import { MessageEntity } from './entities/messages.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity])],
    controllers: [ChatsController],
    providers: [ChatsService, AuthGuard, JwtService, UsersService, SecurityService],
    exports: [ChatsService],
})
export class ChatsModule {}

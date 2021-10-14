import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../users/entities/users.entity';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [ChatsController],
    providers: [ChatsService],
})
export class ChatsModule {}

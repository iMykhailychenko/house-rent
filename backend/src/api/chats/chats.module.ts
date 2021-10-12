import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatEntity } from './entities/chats.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity])],
    controllers: [ChatsController],
    providers: [ChatsService],
})
export class ChatsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthGuard } from '../../shared/guards/auth.guards';
import { ChatEntity } from '../chats/entities/chats.entity';
import { MessageEntity } from '../chats/entities/messages.entity';

import { RatingEntity } from './entities/rating.entity';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
    imports: [TypeOrmModule.forFeature([RatingEntity, MessageEntity, ChatEntity])],
    controllers: [RatingController],
    providers: [AuthGuard, RatingService],
})
export class RatingModule {}

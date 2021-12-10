import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guards';

import { User } from '../../shared/decorators/users.decorator';
import { Pagination } from '../../shared/interfaces/interface';

import { ChatResponse } from './chats.interface';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatEntity } from './entities/chats.entity';
import { MessageEntity } from './entities/messages.entity';

@Controller('chats')
export class ChatsController {
    constructor(private readonly chatsService: ChatsService) {}

    @Get('')
    @UseGuards(AuthGuard)
    async findAllForUser(
        @User('id') userId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
    ): Promise<Pagination<ChatResponse>> {
        return await this.chatsService.formatChatResponse({ userId, page, limit });
    }

    @Get('count')
    @UseGuards(AuthGuard)
    async getNewMessagesCount(@User('id') userId: number): Promise<number> {
        return await this.chatsService.getNewMessagesCount(userId);
    }

    @Get(':chatId')
    @UseGuards(AuthGuard)
    async findChatById(@User('id') userId: number, @Param('chatId', ParseIntPipe) chatId: number): Promise<ChatResponse> {
        return await this.chatsService.findChatById(chatId, userId);
    }

    @Get('messages/:chatId')
    @UseGuards(AuthGuard)
    async findAllMessages(
        @User('id') userId: number,
        @Param('chatId', ParseIntPipe) chatId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('limit', ParseIntPipe) limit: number,
    ): Promise<Pagination<MessageEntity>> {
        return await this.chatsService.findAllMessages({ chatId, userId, page, limit });
    }

    @Post('')
    @UseGuards(AuthGuard)
    async createChat(@User('id') userId: number, @Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
        return await this.chatsService.createChat(userId, createChatDto);
    }
}

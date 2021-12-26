import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { User } from '../../shared/decorators/users.decorator';
import { AuthGuard } from '../../shared/guards/auth.guards';
import { Pagination } from '../../shared/interfaces/interface';

import { ChatResponse } from './chats.interface';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
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
    async updateUnreadMessages(@User('id') userId: number, @Param('chatId', ParseIntPipe) chatId: number): Promise<ChatEntity> {
        return await this.chatsService.getSingleChat(chatId, userId);
    }

    @Post('')
    @UseGuards(AuthGuard)
    async createChat(@User('id') userId: number, @Body() createChatDto: CreateChatDto): Promise<ChatEntity> {
        return await this.chatsService.createChat(userId, createChatDto);
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

    @Put('messages')
    @UseGuards(AuthGuard)
    async updateMessage(@User('id') userId: number, @Body() updateMessageDto: UpdateMessageDto): Promise<MessageEntity> {
        return await this.chatsService.updateMessage(userId, updateMessageDto);
    }

    @Delete('messages/:messageId')
    @UseGuards(AuthGuard)
    async deleteMessage(@User('id') userId: number, @Param('messageId', ParseIntPipe) messageId: number): Promise<void> {
        await this.chatsService.deleteMessage(userId, messageId);
    }
}

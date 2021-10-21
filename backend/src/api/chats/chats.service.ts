import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { Repository } from 'typeorm';

import { Pagination } from '../../shared/interfaces/interface';
import { UserEntity, UserRole } from '../users/entities/users.entity';

import { ChatResponse, CustomMessages, FindAllChatsParams, FindAllMessagesParams } from './chats.interface';
import { CreateChatDto } from './dto/create-chat.dto';
import { MessageDto } from './dto/create-message.dto';
import { ChatEntity } from './entities/chats.entity';
import { MessageEntity } from './entities/messages.entity';

@Injectable()
export class ChatsService {
    constructor(
        @InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>,
        @InjectRepository(MessageEntity) private readonly messageRepository: Repository<MessageEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll({ userId, page = 1, limit = 20 }: FindAllChatsParams): Promise<Pagination<ChatEntity>> {
        const sqlQuery = this.chatRepository
            .createQueryBuilder('chats')
            .where('(chats.users)::int[] @> (:userId)::int[]', { userId: [userId] })
            .orderBy('chats.creationDate', 'DESC');

        const total = await sqlQuery.getCount();
        const result = await sqlQuery
            .offset(limit * (page - 1))
            .limit(limit)
            .getMany();

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit) - 1,
            currentPage: +page,
            data: result,
        };
    }

    async formatChatResponse({ userId, page, limit }: FindAllChatsParams): Promise<Pagination<ChatResponse>> {
        const chatsList = await this.findAll({ userId, page, limit });

        for await (const chat of chatsList.data) {
            const sqlQuery = this.messageRepository
                .createQueryBuilder('messages')
                .leftJoin('messages.author', 'author')
                .where('messages.chat = :chatId', { chatId: chat.id });

            chat.lastMessage = await sqlQuery.orderBy('messages.creationDate', 'DESC').getOne();
            chat.unreadMessages = await sqlQuery
                .andWhere('(messages.isNew = TRUE AND author.id != :userId)', { userId })
                .getCount();
            chat.user = await this.userRepository.findOne(userId === chat.users[0] ? chat.users[1] : chat.users[0]);
            delete chat.users;
        }

        return chatsList as Pagination<ChatResponse>;
    }

    async findAllMessages({ chatId, userId, page = 1, limit = 20 }: FindAllMessagesParams): Promise<Pagination<MessageEntity>> {
        const chat = await this.chatRepository
            .createQueryBuilder('chats')
            .where('(chats.users)::int[] @> (:userId)::int[]', { userId: [userId] })
            .getOne();
        if (!chat) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

        await this.updateUnreadMessages(chat, userId);

        const [result, total] = await this.messageRepository.findAndCount({
            relations: ['author'],
            where: {
                chat: {
                    id: chatId,
                },
            },
            order: { creationDate: 'DESC' },
            take: limit,
            skip: limit * (page - 1),
        });

        return {
            totalItems: total,
            totalPages: Math.ceil(total / limit) - 1,
            currentPage: +page,
            data: result,
        };
    }

    async createChat(userId: number, createChatDto: CreateChatDto): Promise<ChatEntity> {
        const realtor = await this.userRepository.findOne(createChatDto.realtor);
        if (!realtor) throw new HttpException('User with id' + createChatDto.realtor + 'not found', HttpStatus.NOT_FOUND);

        const customer = await this.userRepository.findOne(createChatDto.customer);
        if (!customer) throw new HttpException('User with id' + createChatDto.customer + 'not found', HttpStatus.NOT_FOUND);

        if (!realtor.role.includes(UserRole.REALTOR) || !customer.role.includes(UserRole.USER))
            throw new HttpException('Invalid user role', HttpStatus.BAD_REQUEST);

        if (realtor.id === customer.id) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);

        const chat = await this.chatRepository
            .createQueryBuilder('chats')
            .where('(chats.users)::int[] @> (:users)::int[]', {
                users: [realtor.id, customer.id],
            })
            .getOne();

        if (chat) return chat;

        const firstMessage = new MessageEntity();
        firstMessage.author = realtor;
        firstMessage.text = CustomMessages.FIRST_MESSAGE;

        const newChat = new ChatEntity();
        newChat.messages = [firstMessage];
        newChat.users = [realtor.id, customer.id];

        await this.messageRepository.save(firstMessage);
        return await this.chatRepository.save(newChat);
    }

    async createMessage(createMessageDto: MessageDto): Promise<MessageEntity> {
        const author = await this.userRepository.findOne(createMessageDto.author);
        if (!author) throw new WsException('User do not exist');

        const chat = await this.chatRepository.findOne(createMessageDto.chatId);
        if (!author) throw new WsException('Chat do not exist');

        const message = new MessageEntity();
        message.chat = chat;
        message.author = author;
        message.text = createMessageDto.message;
        message.uploads = createMessageDto.uploads;

        return await this.messageRepository.save(message);
    }

    async isUserBelongToChat(userId: number, chatId: number): Promise<boolean> {
        const chat = await this.chatRepository.findOne(chatId);
        if (!chat) return false;
        return chat.users.includes(userId);
    }

    async updateUnreadMessages(chatId: ChatEntity, userId: number): Promise<void> {
        await this.messageRepository
            .createQueryBuilder('messages')
            .leftJoin('messages.author', 'author')
            .update()
            .set({ isNew: false })
            .where('author.id != :userId', { userId })
            .execute();
    }
}

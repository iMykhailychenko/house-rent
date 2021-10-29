import { UserEntity } from '../users/entities/users.entity';

import { MessageEntity } from './entities/messages.entity';

export interface FindAllChatsParams {
    userId: number;
    page?: number;
    limit?: number;
}

export interface FindAllMessagesParams {
    userId: number;
    chatId: number;
    page?: number;
    limit?: number;
}

export enum CustomMessages {
    FIRST_MESSAGE = 'FIRST_MESSAGE',
}

export interface ChatResponse {
    id: number;
    createdAt: Date;
    unreadMessages: number;
    lastMessage: MessageEntity;
    user: UserEntity;
}

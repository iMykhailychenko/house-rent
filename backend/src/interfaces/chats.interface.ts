import { MessageEntity } from '../api/chats/entities/messages.entity';
import { UserEntity } from '../api/users/entities/users.entity';

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
    creationDate: Date;
    unreadMessages: number;
    lastMessage: MessageEntity;
    user: UserEntity;
}

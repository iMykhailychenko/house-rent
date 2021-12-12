import { IUser, Pagination } from '../../../interfaces';
import { ErrorState, LoadingStatus } from '../../interfaces/common';

export interface CreateChatPayload {
    customer: number;
    realtor: number;
}

export interface Chat {
    id: number;
    createdAt: string;
    unreadMessages: number;
    lastMessage: Message;
    user: IUser;
}

export interface Message {
    id: number;
    text: string;
    isNew: boolean;
    uploads: string[];
    createdAt: string;
    updatedAt: string | null;
    author: IUser;
}

interface BaseType {
    status: LoadingStatus;
    error: ErrorState;
}

export type ChatsList = Pagination<Chat> & BaseType;

export type MessagesList = Pagination<Message> & BaseType;

export interface MessagesListPayload {
    page?: number;
    chatId: number;
}

export interface SocketMessagesPayload {
    author: number;
    message: string;
    uploads: string[];
    chatId: number;
}

export interface UpdateMessagesPayload {
    id: number;
    chatId: number;
    userId: number;
    message: string;
    uploads: string[];
}

export interface IChatsState {
    count: number;
    active: number;
    list: ChatsList;
    messages: MessagesList;
}

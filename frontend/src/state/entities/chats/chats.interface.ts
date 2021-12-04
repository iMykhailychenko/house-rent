import { IUser, Pagination } from '../../../interfaces';
import { LoadingStatus } from '../../interfaces';

export interface CreateChatPayload {
    customer: number;
    realtor: number;
}

export interface ChatListPayload {
    withLoader?: boolean;
    page?: number;
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
    error: string | null;
}

export type ChatsList = Pagination<Chat> & BaseType;

export type MessagesList = Pagination<Message> & BaseType;

export interface SingleChat {
    status: LoadingStatus;
    data: Chat | null;
}

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
    single: SingleChat;
    list: ChatsList;
    messages: MessagesList;
}

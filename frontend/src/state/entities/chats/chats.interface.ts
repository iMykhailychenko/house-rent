import { IUser, Pagination } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';

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
    creationDate: string;
    unreadMessages: number;
    lastMessage: Message;
    user: IUser;
}

export interface Message {
    id: number;
    text: string;
    isNew: boolean;
    uploads: string[];
    creationDate: string;
    author: IUser;
}

interface BaseType {
    status: ThunkStatuses;
    error: string | null;
}

export type ChatsList = Pagination<Chat> & BaseType;

export type MessagesList = Pagination<Message> & BaseType;

export interface SingleChat {
    status: ThunkStatuses;
    data: Chat | null;
}

export interface MessagesListPayload {
    page?: number;
    chatId: number;
}

export interface IChatsState {
    single: SingleChat;
    list: ChatsList;
    messages: MessagesList;
}

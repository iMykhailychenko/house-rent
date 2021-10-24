import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Response } from '../../../interfaces';

import { Chat, CreateChatPayload, Message, MessagesListPayload } from './chats.interface';

const chatsServices = {
    chats: (page = 1): Response<Pagination<Chat>> =>
        axios.get(endpointConfig(`/chats/?page=${page}&limit=${uiConfig.chatsPerPage}`)),
    singleChat: (chatId: number): Response<Chat> => axios.get(endpointConfig(`/chats/${chatId}`)),
    messages: ({ chatId, page = 1 }: MessagesListPayload): Response<Pagination<Message>> =>
        axios.get(endpointConfig(`/chats/messages/${chatId}/?page=${page}&limit=${uiConfig.messagesPerPage}`)),
    createChat: (data: CreateChatPayload): Response<Chat> => axios.post(endpointConfig('/chats'), data),
};

export default chatsServices;

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Response } from '../../../interfaces';
import api from '../../../utils/interceptors';

import { Chat, CreateChatPayload, Message, MessagesListPayload, SingleChat } from './chats.interface';

const chatsService = {
    chats: (page = 1): Response<Pagination<Chat>> =>
        api.get(endpointConfig(`/chats/?page=${page}&limit=${uiConfig.chatsPerPage}`)),
    count: (): Response<number> => api.get(endpointConfig('/chats/count')),
    singleChat: (chatId: number): Response<SingleChat> => api.get(endpointConfig(`/chats/${chatId}`)),
    messages: ({ chatId, page = 1 }: MessagesListPayload): Response<Pagination<Message>> =>
        api.get(endpointConfig(`/chats/messages/${chatId}/?page=${page}&limit=${uiConfig.messagesPerPage}`)),
    createChat: (data: CreateChatPayload): Response<Chat> => api.post(endpointConfig('/chats'), data),
};

export default chatsService;

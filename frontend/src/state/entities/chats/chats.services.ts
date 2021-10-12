import { AxiosResponse } from 'axios';

import { Pagination, Response } from '../../../interfaces';

import { Chat, Message, MessagesListPayload } from './chats.interface';
import { chatMockPagination, messagesMockPagination } from './chats.mock';

const chatsServices = {
    // chats: (page = 1): Response<Pagination<Chat>> => axios.get(endpointConfig(`/chats/?page=${page}`)),
    // chat: (chat: number, page = 1): Response<Chat> => axios.get(endpointConfig(`/chats/${chat}/?page=${page}`)),
    // messages: (chat: number, page = 1): Response<Pagination<Message>> =>
    //     axios.get(endpointConfig(`/chats/messages/${chat}/?page=${page}`)),

    // todo temp
    chats: (page = 1): Response<Pagination<Chat>> =>
        new Promise<AxiosResponse<Pagination<Chat>>>(resolve => {
            setTimeout(() => {
                resolve({
                    data: chatMockPagination,
                    status: 200 + page,
                    statusText: 'ok',
                    headers: null,
                    config: { url: '' },
                } as AxiosResponse);
            }, 1500);
        }),

    messages: (data: MessagesListPayload): Response<Pagination<Message>> =>
        new Promise<AxiosResponse<Pagination<Message>>>(resolve => {
            setTimeout(() => {
                resolve({
                    data: messagesMockPagination,
                    status: 200 + data.chatId,
                    statusText: 'ok',
                    headers: null,
                    config: { url: '' },
                } as AxiosResponse);
            }, 1500);
        }),
};

export default chatsServices;

import axios from 'axios';

import endpointConfig from '../../../config/endpoint.config';
import uiConfig from '../../../config/ui.config';
import { Pagination, Response } from '../../../interfaces';

import { Chat, CreateChatPayload, Message, MessagesListPayload } from './chats.interface';

const chatsServices = {
    chats: (page = 1): Response<Pagination<Chat>> =>
        axios.get(endpointConfig(`/chats/?page=${page}&limit=${uiConfig.chatsPerPage}`)),
    // chat: (chat: number, page = 1): Response<Chat> => axios.get(endpointConfig(`/chats/${chat}/?page=${page}`)),
    messages: ({ chatId, page = 1 }: MessagesListPayload): Response<Pagination<Message>> =>
        axios.get(endpointConfig(`/chats/messages/${chatId}/?page=${page}&limit=${uiConfig.chatsPerPage}`)),

    createChat: (data: CreateChatPayload): Response<Chat> => axios.post(endpointConfig('/chats'), data),

    // // todo temp
    // chats: (page = 1): Response<Pagination<Chat>> =>
    //     new Promise<AxiosResponse<Pagination<Chat>>>(resolve => {
    //         setTimeout(() => {
    //             resolve({
    //                 data: chatMockPagination,
    //                 status: 200 + page,
    //                 statusText: 'ok',
    //                 headers: null,
    //                 config: { url: '' },
    //             } as AxiosResponse);
    //         }, 1500);
    //     }),

    // messages: (data: MessagesListPayload): Response<Pagination<Message>> =>
    //     new Promise<AxiosResponse<Pagination<Message>>>(resolve => {
    //         setTimeout(() => {
    //             resolve({
    //                 data: messagesMockPagination,
    //                 status: 200 + data.chatId,
    //                 statusText: 'ok',
    //                 headers: null,
    //                 config: { url: '' },
    //             } as AxiosResponse);
    //         }, 1500);
    //     }),
};

export default chatsServices;

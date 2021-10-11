import { AxiosResponse } from 'axios';

import { Pagination, Response, UserRole } from '../../../interfaces';

import { Chat } from './chats.interface';

const chatMock: Chat[] = [
    {
        id: 1,
        creationDate: '2021-10-07T15:07:30.114Z',
        newMessages: 0,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: {
            id: 1,
            creationDate: '2021-10-07T15:07:30.114Z',
            lastActivity: '2021-10-11T06:42:47.760Z',
            avatar: null,
            firstName: 'Иван',
            lastName: 'Бобров',
            isEmailVerified: false,
            email: 'user2@email.com',
            role: [UserRole.REALTOR],
        },
    },
    {
        id: 2,
        creationDate: '2021-10-07T15:07:30.114Z',
        newMessages: 3,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: {
            id: 1,
            creationDate: '2021-10-07T15:07:30.114Z',
            lastActivity: '2021-10-11T06:42:47.760Z',
            avatar: null,
            firstName: 'Иван',
            lastName: 'Бобров',
            isEmailVerified: false,
            email: 'user2@email.com',
            role: [UserRole.REALTOR],
        },
    },
    {
        id: 2,
        creationDate: '2021-10-07T15:07:30.114Z',
        newMessages: 31,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: {
            id: 1,
            creationDate: '2021-10-07T15:07:30.114Z',
            lastActivity: '2021-10-11T06:42:47.760Z',
            avatar: null,
            firstName: 'Иван',
            lastName: 'Бобров',
            isEmailVerified: false,
            email: 'user2@email.com',
            role: [UserRole.REALTOR],
        },
    },
    {
        id: 3,
        creationDate: '2021-10-07T15:07:30.114Z',
        newMessages: 0,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: {
            id: 1,
            creationDate: '2021-10-07T15:07:30.114Z',
            lastActivity: '2021-10-11T06:42:47.760Z',
            avatar: null,
            firstName: 'Иван',
            lastName: 'Бобров',
            isEmailVerified: false,
            email: 'user2@email.com',
            role: [UserRole.REALTOR],
        },
    },
];

const chatPaginationMock = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    data: chatMock,
};

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
                    data: chatPaginationMock,
                    status: 200 + page,
                    statusText: 'ok',
                    headers: null,
                    config: { url: '' },
                } as AxiosResponse);
            }, 3000);
        }),
};

export default chatsServices;

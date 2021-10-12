import { UserRole } from '../../../interfaces';

import { Chat, Message } from './chats.interface';

const user = {
    id: 1,
    creationDate: '2021-10-07T15:07:30.114Z',
    lastActivity: '2021-10-11T06:42:47.760Z',
    avatar: null,
    firstName: 'Иван',
    lastName: 'Бобров',
    isEmailVerified: false,
    email: 'user2@email.com',
    role: [UserRole.REALTOR],
};

const user2 = {
    ...user,
    id: 2,
    firstName: 'Михаил',
    lastName: 'Соколов',
    email: 'test@email.com',
    role: [UserRole.USER],
};

const chatMock: Chat[] = [
    {
        id: 1,
        creationDate: '2021-10-07T23:09:30.114Z',
        newMessages: 0,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: user,
    },
    {
        id: 2,
        creationDate: '2021-10-07T23:07:30.114Z',
        newMessages: 3,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: user,
    },
    {
        id: 2,
        creationDate: '2021-10-07T22:22:30.114Z',
        newMessages: 31,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: user,
    },
    {
        id: 3,
        creationDate: '2021-10-07T22:12:30.114Z',
        newMessages: 0,
        lastMessage:
            'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        recipient: user,
    },
];

const messagesMock: Message[] = [
    {
        id: 5,
        text: 'Dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-07T22:07:30.114Z',
        author: user,
    },
    {
        id: 4,
        text: 'Sit amet ipsum dolor sit amet ipsum dolor',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-07T21:07:30.114Z',
        author: user2,
    },
    {
        id: 3,
        text: 'Famet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet. Sit amet ipsum dolor sit amet ipsum dolor',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-07T20:07:30.114Z',
        author: user2,
    },
    {
        id: 2,
        text: 'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T19:07:30.114Z',
        author: user,
    },
    {
        id: 1,
        text: 'Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T18:07:30.114Z',
        author: user,
    },

    {
        id: 15,
        text: 'Dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T17:07:30.114Z',
        author: user,
    },
    {
        id: 14,
        text: 'Sit amet ipsum dolor sit amet ipsum dolor',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T16:07:30.114Z',
        author: user2,
    },
    {
        id: 13,
        text: 'Famet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet. Sit amet ipsum dolor sit amet ipsum dolor',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T15:05:30.114Z',
        author: user2,
    },
    {
        id: 12,
        text: 'Amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-06T14:04:01.114Z',
        author: user,
    },
    {
        id: 11,
        text: 'Ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-05T13:03:30.114Z',
        author: user,
    },
    {
        id: 22,
        text: 'Amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-05T12:08:30.114Z',
        author: user,
    },
    {
        id: 21,
        text: 'Ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet Lorem ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet',
        isNew: false,
        uploads: [],
        creationDate: '2021-10-04T10:07:31.114Z',
        author: user,
    },
];

const mockPagination = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    data: [],
};

export const chatMockPagination = { ...mockPagination, data: chatMock };
export const messagesMockPagination = { ...mockPagination, data: messagesMock };

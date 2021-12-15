import { IChatsState } from './chats.interface';

export const chatInitialState: IChatsState = {
    count: 0,
    active: 0,
    single: {
        error: null,
        status: 'idle',
        data: {
            realtorId: 0,
            customerId: 0,
        },
    },
    list: {
        status: 'idle',
        error: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        data: [],
    },
    messages: {
        status: 'idle',
        error: null,
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        data: [],
    },
};

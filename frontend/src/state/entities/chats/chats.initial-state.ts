import { IChatsState } from './chats.interface';

export const chatInitialState: IChatsState = {
    single: {
        status: 'idle',
        data: null,
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

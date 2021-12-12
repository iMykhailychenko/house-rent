import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../interfaces/common';
import { formatSeverError } from '../../utils';

import { Chat, CreateChatPayload, Message, MessagesListPayload } from './chats.interface';
import chatsServices from './chats.services';

export const messagesCountThunk = createAsyncThunk<number, undefined>('CHATS/COUNT', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsServices.count();
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

export const singleChatThunk = createAsyncThunk<Chat, number>('CHATS/SINGLE', async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsServices.singleChat(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

export const createChatThunk = createAsyncThunk<Chat, CreateChatPayload>('CHATS/CREATE', async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsServices.createChat(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

type ChatPayloadCreator = AsyncThunkPayloadCreator<Pagination<Chat>, number, AsyncThunkConfig>;
const chatPayloadCreator: ChatPayloadCreator = async (payload = 1, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsServices.chats(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};
export const chatListThunk = createAsyncThunk<Pagination<Chat>, number>('CHATS/LIST', chatPayloadCreator);
export const chatListPaginationThunk = createAsyncThunk<Pagination<Chat>, number>('CHATS/LIST_PAGINATION', chatPayloadCreator);

type MessagePayloadCreator = AsyncThunkPayloadCreator<Pagination<Message>, MessagesListPayload, AsyncThunkConfig>;
const messagePayloadCreator: MessagePayloadCreator = async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsServices.messages(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};
export const messagesListThunk = createAsyncThunk<Pagination<Message>, MessagesListPayload>(
    'MESSAGES/LIST',
    messagePayloadCreator,
);
export const messagesListPaginationThunk = createAsyncThunk<Pagination<Message>, MessagesListPayload>(
    'MESSAGES/LIST_PAGINATION',
    messagePayloadCreator,
);

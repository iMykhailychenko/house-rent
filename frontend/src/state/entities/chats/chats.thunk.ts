import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers';

import { Chat, ChatListPayload, CreateChatPayload, Message, MessagesListPayload } from './chats.interface';
import chatsServices from './chats.services';

export const chatListThunk = createAsyncThunk<Pagination<Chat>, ChatListPayload>('CHATS/LIST', async payload => {
    try {
        const { data, status } = await chatsServices.chats(payload.page);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

export const messagesListThunk = createAsyncThunk<Pagination<Message>, MessagesListPayload>('MESSAGES/LIST', async payload => {
    try {
        const { data, status } = await chatsServices.messages(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

export const createChatThunk = createAsyncThunk<Chat, CreateChatPayload>('CHAT/CREATE', async payload => {
    try {
        const { data, status } = await chatsServices.createChat(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

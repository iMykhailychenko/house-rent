import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';

import { Chat } from './chats.interface';
import chatsServices from './chats.services';

export const chatListThunk = createAsyncThunk<Pagination<Chat>, number | undefined>('CHATS/LIST', async (payload?: number) => {
    const { data, status } = await chatsServices.chats(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

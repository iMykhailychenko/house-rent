import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { Chat } from '../chats.interface';
import chatsService from '../chats.service';

type ChatPayloadCreator = AsyncThunkPayloadCreator<Pagination<Chat>, number, AsyncThunkConfig>;
const chatPayloadCreator: ChatPayloadCreator = async (payload = 1, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsService.chats(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};
export const chatListThunk = createAsyncThunk<Pagination<Chat>, number>('CHATS/LIST', chatPayloadCreator);
export const chatListPaginationThunk = createAsyncThunk<Pagination<Chat>, number>('CHATS/LIST_PAGINATION', chatPayloadCreator);

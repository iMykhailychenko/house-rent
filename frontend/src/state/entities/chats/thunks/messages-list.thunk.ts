import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { Message, MessagesListPayload } from '../chats.interface';
import chatsService from '../chats.service';

type MessagePayloadCreator = AsyncThunkPayloadCreator<Pagination<Message>, MessagesListPayload, AsyncThunkConfig>;
const messagePayloadCreator: MessagePayloadCreator = async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsService.messages(payload);
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

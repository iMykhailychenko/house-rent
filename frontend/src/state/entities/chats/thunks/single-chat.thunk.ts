import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import { SingleChat } from '../chats.interface';
import chatsService from '../chats.service';

export const singleChatThunk = createAsyncThunk<SingleChat, number>('CHATS/SINGLE', async (payload, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsService.singleChat(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import chatsService from '../chats.service';

export const messagesCountThunk = createAsyncThunk<number, undefined>('CHATS/COUNT', async (_, { rejectWithValue }) => {
    try {
        const { data, status } = await chatsService.count();
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import toastConfig from '../../../../config/toast.cofig';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import chatsService from '../chats.service';

export const deleteMessageThunk = createAsyncThunk<number, number>(
    'CHATS/DELETE_MESSAGE',
    async (payload, { rejectWithValue }) => {
        try {
            const { status } = await chatsService.deleteMessage(payload);
            if (status < 200 || status >= 300) throw new Error();

            toast.success('Ви успішно видалили повідомлення', toastConfig);
            return payload;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { paginationEmitter } from '../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../interfaces/common';
import { formatSeverError } from '../../utils';

import { INotification } from './notifications.interface';
import { notificationsServices } from './notifications.services';

type PayloadCreator = AsyncThunkPayloadCreator<Pagination<INotification>, number | undefined, AsyncThunkConfig>;
const payloadCreator: PayloadCreator = async (payload = 1, { rejectWithValue }) => {
    try {
        paginationEmitter.update(payload);
        const { data, status } = await notificationsServices.get(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};

export const notificationsListThunk = createAsyncThunk<Pagination<INotification>, number | undefined, AsyncThunkConfig>(
    'NOTIFICATIONS/LIST',
    payloadCreator,
);

export const notificationsListPaginationThunk = createAsyncThunk<Pagination<INotification>, number | undefined, AsyncThunkConfig>(
    'NOTIFICATIONS/LIST_PAGINATION',
    payloadCreator,
);

export const getNotificationsCountThunk = createAsyncThunk<number, undefined, AsyncThunkConfig>(
    'NOTIFICATIONS/COUNT',
    async (_, { rejectWithValue }) => {
        try {
            const { data, status } = await notificationsServices.count();
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

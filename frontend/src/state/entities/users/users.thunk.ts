import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../utils';

import userServices from './users.services';

export const userInfoThunk = createAsyncThunk<IUser, number>('USER/INFO', async (payload: number, { rejectWithValue }) => {
    try {
        const { data, status } = await userServices.getUserInfo(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

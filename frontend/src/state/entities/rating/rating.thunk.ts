import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../interfaces/common';
import { formatSeverError } from '../../utils';

import { UserRating } from './rating.interface';
import { ratingService } from './rating.service';

export const getRatingThunk = createAsyncThunk<UserRating, number, AsyncThunkConfig>(
    'RATING/GET',
    async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await ratingService.get(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

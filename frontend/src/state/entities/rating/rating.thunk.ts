import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import toastCofig from '../../../config/toast.cofig';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../interfaces/common';
import { formatSeverError } from '../../utils';

import { ICanRate, RatingPayload, UserRating } from './rating.interface';
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

export const canRateThunk = createAsyncThunk<ICanRate, number, AsyncThunkConfig>(
    'RATING/CAN_RATE',
    async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await ratingService.canRate(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const rateUserThunk = createAsyncThunk<void, RatingPayload, AsyncThunkConfig>(
    'RATING/RATE',
    async (payload, { rejectWithValue }) => {
        try {
            const { status } = await ratingService.create(payload);
            if (status < 200 || status >= 300) throw new Error();
            toast.success('Ви успішно надіслали ваш відгук. Згодом він відобразится на сайті', toastCofig);
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const editRateUserThunk = createAsyncThunk<void, RatingPayload, AsyncThunkConfig>(
    'RATING/RATE',
    async (payload, { rejectWithValue }) => {
        try {
            const { status } = await ratingService.update(payload);
            if (status < 200 || status >= 300) throw new Error();
            toast.success('Ви успішно змінили ваш відгук. Згодом він відобразится на сайті', toastCofig);
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

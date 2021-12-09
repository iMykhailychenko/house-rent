import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { paginationEmitter } from '../../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const togglePostFavoriteThunk = createAsyncThunk<void, number, AsyncThunkConfig>(
    'POSTS/TOGGLE_FAVORITE',
    async (payload, { rejectWithValue }) => {
        try {
            const { status } = await postsServices.toggleFavorite(payload);
            if (status < 200 || status >= 300) throw new Error();
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const getIsPostFavoriteThunk = createAsyncThunk<boolean, IPost, AsyncThunkConfig>(
    'POSTS/IS_FAVORITE',
    async (payload, { rejectWithValue }) => {
        try {
            const { data, status } = await postsServices.getIsPostFavorite(payload.id);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

type PayloadCreator = AsyncThunkPayloadCreator<Pagination<IPost>, number, AsyncThunkConfig>;
const payloadCreator: PayloadCreator = async (payload, { rejectWithValue }) => {
    try {
        paginationEmitter.update(payload);
        const { data, status } = await postsServices.getFavorite(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};

export const getFavoritePostsThunk = createAsyncThunk<Pagination<IPost>, number>('POSTS/GET_FAVORITE', payloadCreator);

export const getFavoritePostsPaginationThunk = createAsyncThunk<Pagination<IPost>, number>(
    'POSTS/GET_FAVORITE_PAGINATION',
    payloadCreator,
);

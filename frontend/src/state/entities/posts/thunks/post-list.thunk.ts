import { createAsyncThunk, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { searchFiltersToArray } from '../../../../utils/helpers/filters.util';
import { paginationEmitter } from '../../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { IPost } from '../posts.interface';
import postsServices from '../posts.services';

type PayloadCreator = AsyncThunkPayloadCreator<Pagination<IPost>, number | undefined, AsyncThunkConfig>;
const payloadCreator: PayloadCreator = async (payload = 1, { getState, rejectWithValue }) => {
    try {
        paginationEmitter.update(payload);
        const state = getState();
        const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};

export const postListThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST',
    payloadCreator,
);

export const postListPaginationThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST_PAGINATION',
    payloadCreator,
);

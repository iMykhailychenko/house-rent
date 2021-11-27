import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { searchFiltersToArray } from '../../../../utils/helpers/filters.util';
import { paginationEmitter } from '../../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../../interfaces';
import { IPost, IUserPostsListPayload } from '../posts.interface';
import postsServices from '../posts.services';

type PayloadCreator = AsyncThunkPayloadCreator<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>;
const payloadCreator: PayloadCreator = async (payload: IUserPostsListPayload, { getState }) => {
    try {
        paginationEmitter.update(payload.page);
        const state = getState();
        const { data, status } = await postsServices.getUserPostsList(payload, searchFiltersToArray(state.filters));
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
};

export const getUserPostsListThunk = createAsyncThunk<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>(
    'POSTS/USER_POSTS',
    payloadCreator,
);

export const getUserPostsListPaginationThunk = createAsyncThunk<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>(
    'POSTS/USER_POSTS_PAGINATION',
    payloadCreator,
);

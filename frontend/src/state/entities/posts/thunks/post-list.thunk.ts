import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { searchFiltersToArray } from '../../../../utils/helpers/filters.util';
import { paginationEmitter } from '../../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../../interfaces';
import { IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const postListThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST',
    async (payload = 1, { getState }) => {
        try {
            paginationEmitter.update(payload);
            const state = getState();
            const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const postListPaginationThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST_PAGINATION',
    async (payload = 1, { getState }) => {
        try {
            paginationEmitter.update(payload);
            const state = getState();
            const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

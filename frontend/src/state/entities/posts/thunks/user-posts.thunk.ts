import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { IPost } from '../posts.interface';
import postsService from '../posts.service';

export const getUserPostsListThunk = createAsyncThunk<Pagination<IPost>, number, AsyncThunkConfig>(
    'POSTS/USER_POSTS',
    async (payload: number, { rejectWithValue }) => {
        try {
            const { data, status } = await postsService.getUserPostsList(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

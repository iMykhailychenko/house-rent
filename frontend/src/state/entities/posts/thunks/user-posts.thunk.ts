import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces';
import { IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const getUserPostsListThunk = createAsyncThunk<Pagination<IPost>, number, AsyncThunkConfig>(
    'POSTS/USER_POSTS',
    async (payload: number) => {
        try {
            const { data, status } = await postsServices.getUserPostsList(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

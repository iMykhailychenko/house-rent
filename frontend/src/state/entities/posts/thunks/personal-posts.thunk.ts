import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces';
import { IPersonalPostsListPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const personalPostsListThunk = createAsyncThunk<Pagination<IPost>, IPersonalPostsListPayload, AsyncThunkConfig>(
    'POSTS/PERSONAL_POSTS',
    async (payload: IPersonalPostsListPayload) => {
        try {
            const { data, status } = await postsServices.personalPosts(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const personalPostsListPaginationThunk = createAsyncThunk<Pagination<IPost>, IPersonalPostsListPayload, AsyncThunkConfig>(
    'POSTS/PERSONAL_POSTS_PAGINATION',
    async (payload: IPersonalPostsListPayload) => {
        try {
            const { data, status } = await postsServices.personalPosts(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);
import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../../interfaces/common';
import { formatSeverError } from '../../../utils';
import { IPersonalPostsListPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

type PayloadCreator = AsyncThunkPayloadCreator<Pagination<IPost>, IPersonalPostsListPayload, AsyncThunkConfig>;
const payloadCreator: PayloadCreator = async (payload: IPersonalPostsListPayload, { rejectWithValue }) => {
    try {
        const { data, status } = await postsServices.personalPosts(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
};

export const personalPostsListThunk = createAsyncThunk<Pagination<IPost>, IPersonalPostsListPayload, AsyncThunkConfig>(
    'POSTS/PERSONAL_POSTS',
    payloadCreator,
);

export const personalPostsListPaginationThunk = createAsyncThunk<Pagination<IPost>, IPersonalPostsListPayload, AsyncThunkConfig>(
    'POSTS/PERSONAL_POSTS_PAGINATION',
    payloadCreator,
);

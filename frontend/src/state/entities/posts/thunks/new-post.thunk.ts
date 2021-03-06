import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import { INewPostPayload, IPost } from '../posts.interface';
import postsService from '../posts.service';

export const newPostThunk = createAsyncThunk<IPost, INewPostPayload>(
    'POSTS/NEW',
    async (payload: INewPostPayload, { rejectWithValue }) => {
        try {
            const { data, status } = await postsService.newPost(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import { IEditPostPayload, IPost } from '../posts.interface';
import postsService from '../posts.service';

export const updatePostThunk = createAsyncThunk<IPost, IEditPostPayload>(
    'POSTS/EDIT',
    async (payload: IEditPostPayload, { rejectWithValue }) => {
        try {
            const { data, status } = await postsService.updatePost(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import { IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const singlePostThunk = createAsyncThunk<IPost, number>('POSTS/SINGLE', async (payload: number, { rejectWithValue }) => {
    try {
        const { data, status } = await postsServices.singlePost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

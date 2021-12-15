import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import { formatSeverError } from '../../../utils';
import postsService from '../posts.service';

export const deletePostThunk = createAsyncThunk<number, number>('POSTS/DELETE', async (payload: number, { rejectWithValue }) => {
    try {
        const { status } = await postsService.deletePost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return payload;
    } catch (error) {
        errorNotif(error);
        return rejectWithValue(formatSeverError(error));
    }
});

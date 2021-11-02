import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers/error-logger.helper';
import postsServices from '../posts.services';

export const deletePostThunk = createAsyncThunk<number, number>('POSTS/DELETE', async (payload: number) => {
    try {
        const { status } = await postsServices.deletePost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return payload;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

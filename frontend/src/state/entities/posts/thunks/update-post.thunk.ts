import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorNotif } from '../../../../utils/helpers';
import { IEditPostPayload, IPost } from '../posts.interface';
import postsServices from '../posts.services';

export const updatePostThunk = createAsyncThunk<IPost, IEditPostPayload>('POSTS/EDIT', async (payload: IEditPostPayload) => {
    try {
        const { data, status } = await postsServices.updatePost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

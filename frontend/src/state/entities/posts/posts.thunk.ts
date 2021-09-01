import { createAsyncThunk } from '@reduxjs/toolkit';

import { INewPostPayload, INewPostResponse } from './posts.interface';
import postsServices from './posts.services';

export const newPostThunk = createAsyncThunk<INewPostResponse, INewPostPayload>('POSTS/NEW', async (payload: INewPostPayload) => {
    const { data, status } = await postsServices.newPost(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

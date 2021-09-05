import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEditPostPayload, INewPostPayload, IPost } from './posts.interface';
import postsServices from './posts.services';

export const newPostThunk = createAsyncThunk<IPost, INewPostPayload>('POSTS/NEW', async (payload: INewPostPayload) => {
    const { data, status } = await postsServices.newPost(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

export const updatePostThunk = createAsyncThunk<IPost, IEditPostPayload>('POSTS/EDIT', async (payload: IEditPostPayload) => {
    const { data, status } = await postsServices.updatePost(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

export const singlePostThunk = createAsyncThunk<IPost, number>('POSTS/SINGLE', async (payload: number) => {
    const { data, status } = await postsServices.singlePost(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

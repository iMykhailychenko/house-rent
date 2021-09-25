import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';

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

export const postListThunk = createAsyncThunk<Pagination<IPost>, number | undefined>('POSTS/LIST', async (payload = 1) => {
    const { data, status } = await postsServices.postsList(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

export const addPostToFavoriteThunk = createAsyncThunk<void, number>('POSTS/ADD_TO_FAVORITE', async payload => {
    const { status } = await postsServices.addToFavorite(payload);
    if (status < 200 || status >= 300) throw new Error();
});

export const deletePostFromFavoriteThunk = createAsyncThunk<void, number>('POSTS/DELETE_FROM_FAVORITE', async payload => {
    const { status } = await postsServices.deleteFromFavorite(payload);
    if (status < 200 || status >= 300) throw new Error();
});

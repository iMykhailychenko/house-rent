import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { searchFiltersToArray } from '../../../utils/helpers/filters.util';
import { AsyncThunkConfig } from '../../interfaces';

import { IEditPostPayload, INewPostPayload, IPost, IUserPostsListPayload } from './posts.interface';
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

export const postListThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST',
    async (payload = 1, { getState }) => {
        const state = getState();
        const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
        if (status < 200 || status >= 300) throw new Error();
        return data;
    },
);

export const postListPaginationThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST_PAGINATION',
    async (payload = 1, { getState }) => {
        const state = getState();
        const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
        if (status < 200 || status >= 300) throw new Error();
        return data;
    },
);

export const getUserPostsList = createAsyncThunk<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>(
    'POSTS/USER_POSTS',
    async (payload, { getState }) => {
        const state = getState();
        const { data, status } = await postsServices.getUserPostsList(payload, searchFiltersToArray(state.filters));
        if (status < 200 || status >= 300) throw new Error();
        return data;
    },
);

export const togglePostFavoriteThunk = createAsyncThunk<void, number>('POSTS/TOGGLE_FAVORITE', async payload => {
    const { status } = await postsServices.toggleFavorite(payload);
    if (status < 200 || status >= 300) throw new Error();
});

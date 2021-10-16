import { createAsyncThunk } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers';
import { searchFiltersToArray } from '../../../utils/helpers/filters.util';
import { paginationEmitter } from '../../../utils/helpers/pagination.helper';
import { AsyncThunkConfig } from '../../interfaces';

import { IEditPostPayload, INewPostPayload, IPost, IUserPostsListPayload } from './posts.interface';
import postsServices from './posts.services';

export const newPostThunk = createAsyncThunk<IPost, INewPostPayload>('POSTS/NEW', async (payload: INewPostPayload) => {
    try {
        const { data, status } = await postsServices.newPost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

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

export const singlePostThunk = createAsyncThunk<IPost, number>('POSTS/SINGLE', async (payload: number) => {
    try {
        const { data, status } = await postsServices.singlePost(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

export const postListThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST',
    async (payload = 1, { getState }) => {
        try {
            paginationEmitter.update(payload);
            const state = getState();
            const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const postListPaginationThunk = createAsyncThunk<Pagination<IPost>, number | undefined, AsyncThunkConfig>(
    'POSTS/LIST_PAGINATION',
    async (payload = 1, { getState }) => {
        try {
            paginationEmitter.update(payload);
            const state = getState();
            const { data, status } = await postsServices.postsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const getUserPostsListThunk = createAsyncThunk<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>(
    'POSTS/USER_POSTS',
    async (payload, { getState }) => {
        try {
            paginationEmitter.update(payload.page);
            const state = getState();
            const { data, status } = await postsServices.getUserPostsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const getUserPostsListPaginationThunk = createAsyncThunk<Pagination<IPost>, IUserPostsListPayload, AsyncThunkConfig>(
    'POSTS/USER_POSTS_PAGINATION',
    async (payload, { getState }) => {
        try {
            paginationEmitter.update(payload.page);
            const state = getState();
            const { data, status } = await postsServices.getUserPostsList(payload, searchFiltersToArray(state.filters));
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const togglePostFavoriteThunk = createAsyncThunk<void, number>('POSTS/TOGGLE_FAVORITE', async payload => {
    try {
        const { status } = await postsServices.toggleFavorite(payload);
        if (status < 200 || status >= 300) throw new Error();
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

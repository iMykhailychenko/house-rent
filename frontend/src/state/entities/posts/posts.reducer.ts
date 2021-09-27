import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../interfaces';

import { postsInitialState } from './posts.initial-state';
import { FORM_TYPE, IPost, IPostState } from './posts.interface';
import { newPostThunk, postListThunk, singlePostThunk, togglePostFavoriteThunk, updatePostThunk } from './posts.thunk';

const postsSlice = createSlice({
    name: 'POSTS',
    initialState: postsInitialState,
    reducers: {
        updateFormType(state: IPostState, action: PayloadAction<FORM_TYPE>) {
            state.new.formType = action.payload;
        },
    },
    extraReducers: builder => {
        // NEW POST THUNK
        builder.addCase(newPostThunk.pending, (state: IPostState) => {
            state.new.status = 'loading';
        });
        builder.addCase(newPostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
            state.new.status = 'success';
            state.new.formType = FORM_TYPE.TWO;
            state.new.data = action.payload;
        });
        builder.addCase(newPostThunk.rejected, (state: IPostState) => {
            state.new.status = 'error';
            state.new.error = 'error';
        });

        // UPDATE POST THUNK
        builder.addCase(updatePostThunk.pending, (state: IPostState) => {
            state.update.status = 'loading';
        });
        builder.addCase(updatePostThunk.fulfilled, (state: IPostState) => {
            state.update.status = 'success';
        });
        builder.addCase(updatePostThunk.rejected, (state: IPostState) => {
            state.update.status = 'error';
            state.update.error = 'error';
        });

        // SINGLE POST THUNK
        builder.addCase(singlePostThunk.pending, (state: IPostState) => {
            state.single.status = 'loading';
        });
        builder.addCase(singlePostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
            state.single.status = 'success';
            state.single.data = action.payload;
        });
        builder.addCase(singlePostThunk.rejected, (state: IPostState) => {
            state.single.status = 'error';
            state.single.error = 'error';
        });

        // SINGLE POST THUNK
        builder.addCase(postListThunk.pending, (state: IPostState) => {
            state.list.status = 'loading';
        });
        builder.addCase(postListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
            state.list.status = 'success';
            state.list.totalItems = action.payload.totalItems;
            state.list.totalPages = action.payload.totalPages;
            state.list.currentPage = action.payload.currentPage;
            state.list.data = action.payload.data;
        });
        builder.addCase(postListThunk.rejected, (state: IPostState) => {
            state.list.status = 'error';
            state.list.error = 'error';
        });

        // HANDLE FAVORITE
        builder.addCase(
            togglePostFavoriteThunk.fulfilled,
            (state: IPostState, action: PayloadAction<void, string, { arg: number }>) => {
                state.single.data = {
                    ...state.single.data,
                    isFavorite: !state.single.data.isFavorite,
                    favorite: state.single.data.isFavorite ? state.single.data.favorite - 1 : state.single.data.favorite + 1,
                };
                state.list.data = state.list.data.map<IPost>(post =>
                    post.id === action.meta.arg
                        ? {
                              ...post,
                              isFavorite: !post.isFavorite,
                              favorite: post.isFavorite ? post.favorite - 1 : post.favorite + 1,
                          }
                        : post,
                );
            },
        );
    },
});

export const { updateFormType } = postsSlice.actions;

export default postsSlice.reducer;

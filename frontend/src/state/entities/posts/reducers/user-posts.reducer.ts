import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { IPost, IPostState } from '../posts.interface';
import { getUserPostsListPaginationThunk, getUserPostsListThunk } from '../thunks/user-posts.thunk';

export const userPostsReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // USER POSTS THUNK
    builder.addCase(getUserPostsListThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getUserPostsListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = action.payload.data;
    });
    builder.addCase(getUserPostsListThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });

    // USER POSTS PAGINATION THUNK
    builder.addCase(getUserPostsListPaginationThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getUserPostsListPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = [...state.list.data, ...action.payload.data];
    });
    builder.addCase(getUserPostsListPaginationThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });
};

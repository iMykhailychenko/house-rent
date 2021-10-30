import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { IPost, IPostState } from '../posts.interface';
import { personalPostsListPaginationThunk, personalPostsListThunk } from '../thunks/personal-posts.thunk';

export const personalPostsReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // PERSONAL POSTS THUNK
    builder.addCase(personalPostsListThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(personalPostsListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = action.payload.data;
    });
    builder.addCase(personalPostsListThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });

    // PERSONAL POSTS PAGINATION THUNK
    builder.addCase(personalPostsListPaginationThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(personalPostsListPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = [...state.list.data, ...action.payload.data];
    });
    builder.addCase(personalPostsListPaginationThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });
};

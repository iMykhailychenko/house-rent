import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { IPost, IPostState } from '../posts.interface';
import { getFavoritePostsPaginationThunk, getFavoritePostsThunk } from '../thunks/post-favorite.thunk';

export const postFavoriteReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(getFavoritePostsThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = action.payload.data;
    });
    builder.addCase(getFavoritePostsThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });

    builder.addCase(getFavoritePostsPaginationThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getFavoritePostsPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = [...state.list.data, ...action.payload.data];
    });
    builder.addCase(getFavoritePostsPaginationThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });
};

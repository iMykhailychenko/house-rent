import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { IPost, IPostState } from '../posts.interface';
import { postListPaginationThunk, postListThunk } from '../thunks/post-list.thunk';

export const postListReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // POSTS LIST THUNK
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

    // POST PAGINATION THUNK
    builder.addCase(postListPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list.status = 'success';
        state.list.totalItems = action.payload.totalItems;
        state.list.totalPages = action.payload.totalPages;
        state.list.currentPage = action.payload.currentPage;
        state.list.data = [...state.list.data, ...action.payload.data];
    });
    builder.addCase(postListPaginationThunk.rejected, (state: IPostState) => {
        state.list.status = 'error';
        state.list.error = 'error';
    });
};

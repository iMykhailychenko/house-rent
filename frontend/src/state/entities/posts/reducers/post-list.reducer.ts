import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { IPost, IPostState } from '../posts.interface';
import { postListPaginationThunk, postListThunk } from '../thunks/post-list.thunk';

export const postListReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // POSTS LIST THUNK
    builder.addCase(postListThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(postListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, error: null, status: 'success' };
    });
    builder.addCase(postListThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });

    // POST PAGINATION THUNK
    builder.addCase(postListPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, error: null, status: 'success', data: [...state.list.data, ...action.payload.data] };
    });
    builder.addCase(postListPaginationThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

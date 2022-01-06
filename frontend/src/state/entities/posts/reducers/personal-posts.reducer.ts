import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { IPost, IPostState } from '../posts.interface';
import { personalPostsListPaginationThunk, personalPostsListThunk } from '../thunks/personal-posts.thunk';

export const personalPostsReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // PERSONAL POSTS THUNK
    builder.addCase(personalPostsListThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(personalPostsListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, status: 'success', error: null };
    });
    builder.addCase(personalPostsListThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });

    // PERSONAL POSTS PAGINATION THUNK
    builder.addCase(personalPostsListPaginationThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        console.log(action.payload);
        state.list = { ...action.payload, data: [...state.list.data, ...action.payload.data], status: 'success', error: null };
    });
    builder.addCase(personalPostsListPaginationThunk.rejected, (state: IPostState, action: PayloadAction<unknown>) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

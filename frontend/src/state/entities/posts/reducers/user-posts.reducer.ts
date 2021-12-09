import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { Pagination } from '../../../../interfaces';
import { ErrorState } from '../../../interfaces/common';
import { IPost, IPostState } from '../posts.interface';
import { getUserPostsListThunk } from '../thunks/user-posts.thunk';

export const userPostsReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    // USER POSTS THUNK
    builder.addCase(getUserPostsListThunk.pending, (state: IPostState) => {
        state.list.status = 'loading';
    });
    builder.addCase(getUserPostsListThunk.fulfilled, (state: IPostState, action: PayloadAction<Pagination<IPost>>) => {
        state.list = { ...action.payload, status: 'success', error: null };
    });
    builder.addCase(getUserPostsListThunk.rejected, (state: IPostState, action) => {
        state.list.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

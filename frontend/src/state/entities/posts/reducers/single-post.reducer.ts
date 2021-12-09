import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { ErrorState } from '../../../interfaces/common';
import { IPost, IPostState } from '../posts.interface';
import { singlePostThunk } from '../thunks/single-post.thunk';

export const singlePostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(singlePostThunk.pending, (state: IPostState) => {
        state.single.status = 'loading';
    });
    builder.addCase(singlePostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
        state.single.status = 'success';
        state.single.data = action.payload;
    });
    builder.addCase(singlePostThunk.rejected, (state: IPostState, action) => {
        state.single.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ErrorState } from '../../../interfaces/common';
import { IPostState } from '../posts.interface';
import { updatePostThunk } from '../thunks/update-post.thunk';

export const updatePostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(updatePostThunk.pending, (state: IPostState) => {
        state.update.status = 'loading';
    });
    builder.addCase(updatePostThunk.fulfilled, (state: IPostState) => {
        state.update.status = 'success';
    });
    builder.addCase(updatePostThunk.rejected, (state: IPostState, action) => {
        state.update.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

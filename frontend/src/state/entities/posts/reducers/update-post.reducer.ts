import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IPostState } from '../posts.interface';
import { updatePostThunk } from '../thunks/update-post.thunk';

export const updatePostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
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
};

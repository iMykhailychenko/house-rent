import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IPostState } from '../posts.interface';
import { updatePostStatusThunk } from '../thunks/update-status.thunk';

export const updateStatusReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(updatePostStatusThunk.pending, (state: IPostState) => {
        state.update.status = 'loading';
    });
    builder.addCase(updatePostStatusThunk.fulfilled, (state: IPostState) => {
        state.update.status = 'success';
    });
    builder.addCase(updatePostStatusThunk.rejected, (state: IPostState) => {
        state.update.status = 'error';
        state.update.error = 'error';
    });
};

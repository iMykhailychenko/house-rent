import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { ErrorState } from '../../../interfaces/common';
import { IPostState } from '../posts.interface';
import { deletePostThunk } from '../thunks/delete-post.thunk';

export const deletePostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(deletePostThunk.pending, (state: IPostState) => {
        state.new.status = 'loading';
    });
    builder.addCase(deletePostThunk.rejected, (state: IPostState, action) => {
        state.new.status = 'error';
        state.new.error = action.payload as ErrorState;
    });
};

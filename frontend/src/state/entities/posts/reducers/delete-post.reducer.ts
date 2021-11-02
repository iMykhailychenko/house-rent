import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { IPostState } from '../posts.interface';
import { deletePostThunk } from '../thunks/delete-post.thunk';

export const deletePostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(deletePostThunk.pending, (state: IPostState) => {
        state.new.status = 'loading';
    });
    builder.addCase(deletePostThunk.rejected, (state: IPostState) => {
        state.new.status = 'error';
        state.new.error = 'error';
    });
};

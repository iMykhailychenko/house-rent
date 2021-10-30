import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

import { FORM_TYPE, IPost, IPostState } from '../posts.interface';
import { newPostThunk } from '../thunks/new-post.thunk';

export const newPostReducer = (builder: ActionReducerMapBuilder<IPostState>): void => {
    builder.addCase(newPostThunk.pending, (state: IPostState) => {
        state.new.status = 'loading';
    });
    builder.addCase(newPostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
        state.new.status = 'success';
        state.new.formType = FORM_TYPE.TWO;
        state.new.data = action.payload;
    });
    builder.addCase(newPostThunk.rejected, (state: IPostState) => {
        state.new.status = 'error';
        state.new.error = 'error';
    });
};

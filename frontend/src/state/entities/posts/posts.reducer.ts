import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsInitialState } from './posts.initial-state';
import { FORM_TYPE, IPost, IPostState } from './posts.interface';
import { newPostThunk, singlePostThunk, updatePostThunk } from './posts.thunk';

const postsSlice = createSlice({
    name: 'POSTS',
    initialState: postsInitialState,
    reducers: {
        updateFormType(state: IPostState, action: PayloadAction<FORM_TYPE>) {
            state.new.formType = action.payload;
        },
    },
    extraReducers: builder => {
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

        builder.addCase(singlePostThunk.pending, (state: IPostState) => {
            state.single.status = 'loading';
        });
        builder.addCase(singlePostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
            state.single.status = 'success';
            state.single.data = action.payload;
        });
        builder.addCase(singlePostThunk.rejected, (state: IPostState) => {
            state.single.status = 'error';
            state.single.error = 'error';
        });
    },
});

export const { updateFormType } = postsSlice.actions;

export default postsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsInitialState } from './posts.initial-state';
import { INewPostResponse, IPostState } from './posts.interface';
import { editPost, newPostThunk } from './posts.thunk';

const postsSlice = createSlice({
    name: 'POSTS',
    initialState: postsInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(newPostThunk.pending, (state: IPostState) => {
            state.new.postStatus = 'loading';
        });
        builder.addCase(newPostThunk.fulfilled, (state: IPostState, action: PayloadAction<INewPostResponse>) => {
            state.new.postStatus = 'success';
            state.new.data = action.payload;
        });
        builder.addCase(newPostThunk.rejected, (state: IPostState) => {
            state.new.postStatus = 'error';
        });

        builder.addCase(editPost.pending, (state: IPostState) => {
            state.edit.status = 'loading';
        });
        builder.addCase(editPost.fulfilled, (state: IPostState) => {
            state.edit.status = 'success';
        });
        builder.addCase(editPost.rejected, (state: IPostState) => {
            state.edit.status = 'error';
            state.edit.error = 'error';
        });
    },
});

export default postsSlice.reducer;

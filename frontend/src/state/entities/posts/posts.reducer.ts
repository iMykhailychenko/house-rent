import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsInitialState } from './posts.initial-state';
import { IPost, IPostState } from './posts.interface';
import { editPostThunk, newPostThunk, singlePostThunk } from './posts.thunk';

const postsSlice = createSlice({
    name: 'POSTS',
    initialState: postsInitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(newPostThunk.pending, (state: IPostState) => {
            state.new.postStatus = 'loading';
        });
        builder.addCase(newPostThunk.fulfilled, (state: IPostState, action: PayloadAction<IPost>) => {
            state.new.postStatus = 'success';
            state.new.data = action.payload;
        });
        builder.addCase(newPostThunk.rejected, (state: IPostState) => {
            state.new.postStatus = 'error';
        });

        builder.addCase(editPostThunk.pending, (state: IPostState) => {
            state.edit.status = 'loading';
        });
        builder.addCase(editPostThunk.fulfilled, (state: IPostState) => {
            state.edit.status = 'success';
        });
        builder.addCase(editPostThunk.rejected, (state: IPostState) => {
            state.edit.status = 'error';
            state.edit.error = 'error';
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
            state.edit.error = 'error';
        });
    },
});

export default postsSlice.reducer;

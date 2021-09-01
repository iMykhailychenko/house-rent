import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { postsInitialState } from './posts.initial-state';
import { INewPostResponse, IPostState } from './posts.interface';
import { newPostThunk } from './posts.thunk';

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
    },
});

export default postsSlice.reducer;

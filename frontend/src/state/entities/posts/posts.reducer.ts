import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { hydrate } from '../../actions';
import { IState } from '../../interfaces';

import { postsInitialState } from './posts.initial-state';
import { FORM_TYPE, IPostState } from './posts.interface';
import { deletePostReducer } from './reducers/delete-post.reducer';
import { newPostReducer } from './reducers/new-post.reducer';
import { personalPostsReducer } from './reducers/personal-posts.reducer';
import { postFavoriteReducer } from './reducers/post-favorite.reducer';
import { postListReducer } from './reducers/post-list.reducer';
import { singlePostReducer } from './reducers/single-post.reducer';
import { updatePostReducer } from './reducers/update-post.reducer';
import { updateStatusReducer } from './reducers/update-status.reducer';
import { userPostsReducer } from './reducers/user-posts.reducer';

const postsSlice = createSlice({
    name: 'POSTS',
    initialState: postsInitialState,
    reducers: {
        updateFormType(state: IPostState, action: PayloadAction<FORM_TYPE>) {
            state.new.formType = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(hydrate, (_, action: PayloadAction<IState>) => action.payload.posts);
        newPostReducer(builder);
        updatePostReducer(builder);
        updateStatusReducer(builder);
        singlePostReducer(builder);
        postListReducer(builder);
        userPostsReducer(builder);
        personalPostsReducer(builder);
        postFavoriteReducer(builder);
        deletePostReducer(builder);
    },
});

export const { updateFormType } = postsSlice.actions;

export default postsSlice.reducer;

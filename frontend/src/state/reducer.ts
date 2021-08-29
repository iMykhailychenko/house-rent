import { combineReducers } from '@reduxjs/toolkit';

import auth from './entities/auth/auth.reducer';
import filters from './entities/filters/filters.reducer';
import posts from './entities/posts/posts.reducer';
import profile from './entities/profile/profile.reducer';
import { IState } from './interfaces';

const rootReducer = combineReducers<IState>({
    auth,
    filters,
    profile,
    posts,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

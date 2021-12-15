import { combineReducers } from '@reduxjs/toolkit';

import auth from './entities/auth/auth.reducer';
import chats from './entities/chats/chats.reducer';
import filters from './entities/filters/filters.reducer';
import media from './entities/media/media.reducer';
import notifications from './entities/notifications/notifications.reducer';
import posts from './entities/posts/posts.reducer';
import profile from './entities/profile/profile.reducer';
import rating from './entities/rating/rating.reducer';
import users from './entities/users/users.reducer';
import { IState } from './interfaces/root';

const rootReducer = combineReducers<IState>({
    auth,
    filters,
    profile,
    posts,
    users,
    media,
    chats,
    notifications,
    rating,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

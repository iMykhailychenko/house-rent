import authInitialState from './entities/auth/auth.initial-state';
import filtersInitialState from './entities/filters/filters.initial-state';
import { mediaInitialState } from './entities/media/media.initial-state';
import { postsInitialState } from './entities/posts/posts.initial-state';
import { profileInitialState } from './entities/profile/profile.initial-state';
import { usersInitialState } from './entities/users/users.initial-state';
import { IState } from './interfaces';

const rootInitialState: IState = {
    auth: authInitialState,
    filters: filtersInitialState,
    profile: profileInitialState,
    posts: postsInitialState,
    users: usersInitialState,
    media: mediaInitialState,
};

export default rootInitialState;

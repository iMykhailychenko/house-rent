import authInitialState from './entities/auth/auth.initial-state';
import { chatInitialState } from './entities/chats/chats.initial-state';
import filtersInitialState from './entities/filters/filters.initial-state';
import { mediaInitialState } from './entities/media/media.initial-state';
import { notificationsInitState } from './entities/notifications/notifications.initial-state';
import { postsInitialState } from './entities/posts/posts.initial-state';
import { profileInitialState } from './entities/profile/profile.initial-state';
import { ratingInitialState } from './entities/rating/rating.initial-state';
import { usersInitialState } from './entities/users/users.initial-state';
import { IState } from './interfaces/root';

const rootInitialState: IState = {
    auth: authInitialState,
    filters: filtersInitialState,
    profile: profileInitialState,
    posts: postsInitialState,
    users: usersInitialState,
    media: mediaInitialState,
    chats: chatInitialState,
    notifications: notificationsInitState,
    rating: ratingInitialState,
};

export default rootInitialState;

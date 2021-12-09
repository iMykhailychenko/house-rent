import { IAuthState } from '../entities/auth/auth.interface';
import { IChatsState } from '../entities/chats/chats.interface';
import { IFiltersState } from '../entities/filters/filters.interface';
import { IMediaState } from '../entities/media/media.interface';
import { INotificationState } from '../entities/notifications/notifications.interface';
import { IPostState } from '../entities/posts/posts.interface';
import { IProfileInfoState } from '../entities/profile/profile.interface';
import { IUserState } from '../entities/users/users.interface';

export interface IState {
    auth: IAuthState;
    filters: IFiltersState;
    profile: IProfileInfoState;
    posts: IPostState;
    users: IUserState;
    media: IMediaState;
    chats: IChatsState;
    notifications: INotificationState;
}

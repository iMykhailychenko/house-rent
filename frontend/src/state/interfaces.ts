import { Dispatch } from 'redux';

import { IAuthState } from './entities/auth/auth.interface';
import { IChatsState } from './entities/chats/chats.interface';
import { IFiltersState } from './entities/filters/filters.interface';
import { IMediaState } from './entities/media/media.interface';
import { IPostState } from './entities/posts/posts.interface';
import { IProfileInfoState } from './entities/profile/profile.interface';
import { IUserState } from './entities/users/users.interface';

export type ThunkStatuses = 'idle' | 'loading' | 'success' | 'error';

export type ErrorState = { status: number; message: string } | null;

export interface IState {
    auth: IAuthState;
    filters: IFiltersState;
    profile: IProfileInfoState;
    posts: IPostState;
    users: IUserState;
    media: IMediaState;
    chats: IChatsState;
}

export type AsyncThunkConfig = {
    state: IState;
    dispatch: Dispatch;
};

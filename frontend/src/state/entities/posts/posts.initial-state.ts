import { userInitValue } from '../profile/profile.initial-state';

import { IPost, IPostState, POST_STATUS } from './posts.interface';

export const singlePostsInitialState: IPost = {
    id: 0,
    title: 'loading...',
    description: 'loading...',
    image: null,
    cityFilters: 'loading...',
    creationDate: 'loading...',
    districtFilters: ['loading...'],
    generalFilters: null,
    houseTypeFilters: ['loading...'],
    priceFilters: ['loading...'],
    roomFilters: ['loading...'],
    status: POST_STATUS.ACTIVE,
    user: userInitValue,
};

export const postsInitialState: IPostState = {
    new: {
        postStatus: 'idle',
        imgStatus: 'idle',
        data: null,
        error: null,
    },
    edit: {
        status: 'idle',
        error: null,
    },
    single: {
        error: null,
        status: 'idle',
        data: singlePostsInitialState,
    },
};

import { userInitValue } from '../profile/profile.initial-state';

import { FORM_TYPE, IPost, IPostState, POST_STATUS } from './posts.interface';

export const singlePostsInitialState: IPost = {
    id: 0,
    title: 'loading...',
    description: 'loading...',
    image: null,
    residentsAmount: 0,
    children: 'loading...',
    pets: 'loading...',
    cityFilters: 'loading...',
    createdAt: 'loading...',
    districtFilters: ['loading...'],
    generalFilters: null,
    houseTypeFilters: ['loading...'],
    priceFilters: ['loading...'],
    roomFilters: ['loading...'],
    status: POST_STATUS.ACTIVE,
    user: userInitValue,
    isFavorite: false,
    favorite: 0,
    chats: 0,
    views: 0,
};

export const postsInitialState: IPostState = {
    new: {
        formType: FORM_TYPE.ONE,
        status: 'idle',
        data: null,
        error: null,
    },
    update: {
        status: 'idle',
        error: null,
    },
    single: {
        error: null,
        status: 'idle',
        data: singlePostsInitialState,
    },
    list: {
        error: null,
        status: 'idle',
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
        data: [],
    },
};

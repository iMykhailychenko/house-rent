import { IPostState } from './posts.interface';

export const postsInitialState: IPostState = {
    new: {
        postStatus: 'idle',
        imgStatus: 'idle',
        data: null,
        error: null,
    },
};

import { IPostState } from './posts.interface';

export const postsInitialState: IPostState = {
    new: {
        postStatus: 'idle',
        imgStatus: 'idle',
        error: null,
    },
};

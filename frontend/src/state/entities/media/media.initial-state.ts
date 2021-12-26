import { IMediaState } from './media.interface';

export const mediaInitialState: IMediaState = {
    progress: 0,
    status: 'idle',
    error: null,
    url: null,
};

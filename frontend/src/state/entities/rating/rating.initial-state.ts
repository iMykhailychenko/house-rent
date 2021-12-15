import { IRatingState } from './rating.interface';

export const ratingInitialState: IRatingState = {
    error: null,
    status: 'idle',
    data: {
        total: 0,
        avg: 0,
    },
};

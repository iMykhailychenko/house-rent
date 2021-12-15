import { CommonState } from '../../interfaces/common';

export interface UserRating {
    total: number;
    avg: number;
}

export interface RatingPayload {
    value: number;
}

export type IRatingState = CommonState<UserRating>;

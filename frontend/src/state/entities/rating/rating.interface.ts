import { CommonState } from '../../interfaces/common';

export interface UserRating {
    total: number;
    avg: number;
}

export interface RatingPayload {
    userId: number;
    value: number;
}

export interface ICanRate {
    canRate: boolean;
    isRated: boolean;
}

export type IRatingState = CommonState<UserRating> & ICanRate;

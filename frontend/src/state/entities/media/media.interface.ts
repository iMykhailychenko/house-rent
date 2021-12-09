import { ErrorState, LoadingStatus } from '../../interfaces/common';

export interface IMediaState {
    progress: number;
    status: LoadingStatus;
    error: ErrorState;
    url: string | null;
}

export interface IMediaResponse {
    url: string;
}

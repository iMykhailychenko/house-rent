import { LoadingStatus } from '../../interfaces';

export interface IMediaState {
    progress: number;
    status: LoadingStatus;
    url: string | null;
}

export interface IMediaResponse {
    url: string;
}

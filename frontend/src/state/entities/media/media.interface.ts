import { ThunkStatuses } from '../../interfaces';

export interface IMediaState {
    progress: number;
    status: ThunkStatuses;
    url: string | null;
}

export interface IMediaResponse {
    url: string;
}

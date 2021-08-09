import { ThunkStatuses } from '../../interfaces';

export interface IAuthInitialState {
    accessToken: string | null;
    status: ThunkStatuses;
}

export interface IAuthResponse {
    accessToken: string | null;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IJoinPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

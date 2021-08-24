import { ThunkStatuses } from '../../interfaces';

export interface IAuthState {
    accessToken: string | null;
    loginStatus: ThunkStatuses;
    joinStatus: ThunkStatuses;
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

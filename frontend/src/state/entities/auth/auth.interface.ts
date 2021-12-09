import { LoadingStatus } from '../../interfaces/common';

export interface IAuthState {
    loginStatus: LoadingStatus;
    joinStatus: LoadingStatus;
}

export interface IAuthResponse {
    accessToken: string | null;
}

export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IRestorePasswordPayload {
    token: string;
    password: string;
}

export interface IRestorePasswordEmailPayload {
    email: string;
}

export interface IJoinPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

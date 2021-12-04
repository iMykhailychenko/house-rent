import { IUser, UserRole } from '../../../interfaces';
import { LoadingStatus } from '../../interfaces';

export interface IUpdateProfilePayload {
    role?: UserRole[];
    firstName?: string;
    lastName?: string;
    avatar?: string | null;
    email?: string;
}

export interface ChangeEmailPayload {
    email: string;
}

export interface IProfileInfoState {
    status: LoadingStatus;
    data: IUser;
}

import { IUser, UserRole } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';

export interface IUpdateProfilePayload {
    role?: UserRole[];
    firstName?: string;
    lastName?: string;
    avatar?: string;
    email?: string;
}

export interface IProfileInfoState {
    status: ThunkStatuses;
    data: IUser;
}

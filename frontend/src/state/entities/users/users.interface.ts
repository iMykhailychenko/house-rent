import { IUser, UserRole } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';

export interface IRoleUpdatePayload {
    id: number;
    role: UserRole[];
}

export interface IUserState {
    status: ThunkStatuses;
    data: IUser;
}

import { UserRole } from '../../../interfaces';
import { ThunkStatuses } from '../../interfaces';

export interface IUser {
    id: number;
    creationDate: string;
    lastActivity: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
    email: string;
    role: UserRole[] | null;
}

export interface IProfileInfoState {
    status: ThunkStatuses;
    data: IUser;
}

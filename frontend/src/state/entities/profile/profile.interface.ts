import { IUser, UserRole } from '../../../interfaces';
import { CommonState } from '../../interfaces/common';

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

export type IProfileInfoState = CommonState<IUser>;

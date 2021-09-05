import { UserRole } from '../../../interfaces';

import { IProfileInfoState, IUser } from './profile.interface';

export const userInitValue: IUser = {
    id: 0,
    creationDate: '01-01-2021',
    lastActivity: '01-01-2021',
    avatar: null,
    firstName: 'loading...',
    lastName: 'loading...',
    isEmailVerified: false,
    email: 'loading...',
    role: [UserRole.USER],
};

export const profileInitialState: IProfileInfoState = {
    status: 'idle',
    data: userInitValue,
};

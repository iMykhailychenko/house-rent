import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser, UserRole } from '../../../interfaces';

import { IRoleUpdatePayload } from './users.interface';
import userServices from './users.services';

export const userInfoThunk = createAsyncThunk<IUser, number>('PROFILE/INFO', async payload => {
    const { data, status } = await userServices.getUserInfo(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

export const updateUserRole = createAsyncThunk<UserRole[], IRoleUpdatePayload>(
    'PROFILE/UPDATE_ROLE',
    async ({ id, role }: IRoleUpdatePayload) => {
        const { status } = await userServices.updateUserRole(id, role);
        if (status < 200 || status >= 300) throw new Error();
        return role;
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser, UserRole } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers';

import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser>('PROFILE/INFO', async () => {
    try {
        const { data, status } = await profileServices.getProfileInfo();
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

export const updateProfileRole = createAsyncThunk<UserRole[], UserRole[]>('PROFILE/UPDATE_ROLE', async (role: UserRole[]) => {
    try {
        const { status } = await profileServices.updateProfileRole(role);
        if (status < 200 || status >= 300) throw new Error();
        return role;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

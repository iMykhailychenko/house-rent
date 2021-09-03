import { createAsyncThunk } from '@reduxjs/toolkit';

import { logoutAction } from '../auth/auth.reducer';

import { IUser } from './profile.interface';
import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser | null>('PROFILE/INFO', async (_, { dispatch }) => {
    const { data, status } = await profileServices.getProfileInfo();
    if (status < 200 || status >= 300) {
        dispatch(logoutAction());
        throw new Error();
    }
    return data;
});

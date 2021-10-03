import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../../interfaces';

import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser>('PROFILE/INFO', async () => {
    const { data, status } = await profileServices.getProfileInfo();
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

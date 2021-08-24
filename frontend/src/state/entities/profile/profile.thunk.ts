import { createAsyncThunk } from '@reduxjs/toolkit';

import { profileInitialState } from './profile.initial-state';
import { IUser } from './profile.interface';
import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser | null>('PROFILE/INFO', async () => {
    try {
        const { data, status } = await profileServices.getProfileInfo();
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        console.dir(error.response || error);
        return profileInitialState.data;
    }
});

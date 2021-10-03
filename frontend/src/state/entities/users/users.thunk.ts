import { createAsyncThunk } from '@reduxjs/toolkit';

import { IUser } from '../../../interfaces';

import userServices from './users.services';

export const userInfoThunk = createAsyncThunk<IUser, number>('PROFILE/INFO', async payload => {
    const { data, status } = await userServices.getUserInfo(payload);
    if (status < 200 || status >= 300) throw new Error();
    return data;
});

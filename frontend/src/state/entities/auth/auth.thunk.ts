import { createAsyncThunk } from '@reduxjs/toolkit';

import { IAuthResponse, ILoginPayload } from './auth.interface';
import authServices from './uath.services';

export const authLoginThunk = createAsyncThunk<IAuthResponse, ILoginPayload>('AUTH/LOGIN', async (payload: ILoginPayload) => {
    try {
        const { data, status } = await authServices.login(payload);
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        console.dir(error);
        return { accessToken: null } as IAuthResponse;
    }
});

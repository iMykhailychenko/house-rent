import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { modal } from '../../../components/common/modal/modal';
import { addMonthToDate } from '../../../utils/helpers/date.helper';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import routes from '../../../utils/routes';
import { profileInfoThunk } from '../profile/profile.thunk';

import { IAuthResponse, IJoinPayload, ILoginPayload } from './auth.interface';
import authServices from './auth.services';

export const authLoginThunk = createAsyncThunk<IAuthResponse, ILoginPayload>(
    'AUTH/LOGIN',
    async (payload: ILoginPayload, { dispatch, rejectWithValue }) => {
        try {
            const { data, status } = await authServices.login(payload);
            if (status < 200 || status >= 300) throw new Error();

            Cookies.set('house_rent_auth', JSON.stringify(data), { expires: addMonthToDate(1) });
            axios.defaults.headers.common.Authorization = data.accessToken;
            await dispatch(profileInfoThunk());

            return data;
        } catch (error) {
            errorNotif(error);
            rejectWithValue({ accessToken: null } as IAuthResponse);
            throw new Error(error);
        } finally {
            modal.close();
        }
    },
);

export const authJoinThunk = createAsyncThunk<void, IJoinPayload>('AUTH/JOIN', async (payload: IJoinPayload) => {
    const { status } = await authServices.join(payload);
    if (status < 200 || status >= 300) throw new Error();
    window.location.href = routes.auth.success;
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import { banner } from '../../../components/common/banner/banner';
import { BannerType } from '../../../components/common/banner/banner.interface';
import { modal } from '../../../components/common/modal/modal';
import { addMonthToDate } from '../../../utils/helpers/date.helper';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import routes from '../../../utils/routes';
import { profileInfoThunk } from '../profile/profile.thunk';

import {
    IAuthResponse,
    IJoinPayload,
    ILoginPayload,
    IRestorePasswordEmailPayload,
    IRestorePasswordPayload,
} from './auth.interface';
import authServices from './auth.services';

export const authLoginThunk = createAsyncThunk<IAuthResponse, ILoginPayload>(
    'AUTH/LOGIN',
    async (payload: ILoginPayload, { dispatch, rejectWithValue }) => {
        try {
            const { data, status } = await authServices.login(payload);
            if (status !== 201) throw new Error();

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
    try {
        const { status } = await authServices.join(payload);
        if (status === 502) {
            toast.error(
                'Виникла помилка з відправкою листа на вашу електронну пошту. Можливо ви вказал невірну поту, перевіте її в особистому кабінеті',
            );
            window.location.href = routes.auth.success;
        }

        if (status !== 204) throw new Error();
        window.location.href = routes.auth.success;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

export const sendRestorePasswordEmailThunk = createAsyncThunk<void, IRestorePasswordEmailPayload>(
    'AUTH/RESTORE_PASSWORD_EMAIL',
    async (payload: IRestorePasswordEmailPayload) => {
        try {
            const { status } = await authServices.restorePasswordEmail(payload);
            if (status < 200 || status >= 300) throw new Error();
            banner.add({
                id: 'RESTORE_PASSWORD_EMAIL',
                type: BannerType.SUCCESS,
                content: 'Ми надіслали на вашу електронну пошту лист з підтвердженням зміни пароля',
            });
        } catch (error) {
            banner.add({
                id: 'RESTORE_PASSWORD_EMAIL',
                type: BannerType.ERROR,
                content: 'Виникла помилка при відправленні листа!',
            });
            throw new Error(error);
        }
    },
);

export const restorePasswordThunk = createAsyncThunk<void, IRestorePasswordPayload>(
    'AUTH/RESTORE_PASSWORD',
    async (payload: IRestorePasswordPayload) => {
        try {
            const { status } = await authServices.restorePassword(payload);
            if (status < 200 || status >= 300) throw new Error();
            banner.add({
                id: 'RESTORE_PASSWORD',
                type: BannerType.SUCCESS,
                content: 'Ви успішно змінили пароль. Тепер ви можете увійти в особистий кабінет використовуючи новий пароль',
            });
        } catch (error) {
            banner.add({
                id: 'RESTORE_PASSWORD',
                type: BannerType.ERROR,
                content:
                    'Виникла помилка зміни пароля! Схоже що ви використовували застаріле або невалідне посилання. Спробуйте надіслати запит на зміну пароля повторно',
            });
            throw new Error(error);
        }
    },
);

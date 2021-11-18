import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import toastConfig from '../../../config/toast.cofig';
import { IUser, UserRole } from '../../../interfaces';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';

import { IUpdateProfilePayload } from './profile.interface';
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

export const updateProfileThunk = createAsyncThunk<IUser, IUpdateProfilePayload>(
    'PROFILE/UPDATE_PROFILE',
    async (payload: IUpdateProfilePayload) => {
        try {
            const { data, status } = await profileServices.updateProfile(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

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

export const sendNewEmail = createAsyncThunk<void, void>('PROFILE/NEW_EMAIL', async () => {
    try {
        const { status } = await profileServices.sendNewEmail();
        if (status < 200 || status >= 300) throw new Error();
        toast.success('Лист успішно відправлено на вашу електронну пошту', toastConfig);
    } catch (error) {
        toast.error('Виникла помилка при відправленні листа!', toastConfig);
        throw new Error(error);
    }
});

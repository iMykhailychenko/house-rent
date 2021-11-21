import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { banner } from '../../../components/common/banner/banner';
import toastConfig from '../../../config/toast.cofig';
import { IUser, UserRole } from '../../../interfaces';
import { VALIDATE_EMAIL_WARN } from '../../../utils/common-banners';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';

import { ChangeEmailPayload, IUpdateProfilePayload } from './profile.interface';
import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser>('PROFILE/INFO', async () => {
    try {
        const { data, status } = await profileServices.getProfileInfo();
        if (status < 200 || status >= 300) throw new Error();

        if (!data.isEmailVerified) {
            banner.add(VALIDATE_EMAIL_WARN);
        }

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

export const updateProfileRoleThunk = createAsyncThunk<UserRole[], UserRole[]>(
    'PROFILE/UPDATE_ROLE',
    async (role: UserRole[]) => {
        try {
            const { status } = await profileServices.updateProfileRole(role);
            if (status < 200 || status >= 300) throw new Error();
            toast.success('Ви успішно змінили роль на сайті!', toastConfig);
            return role;
        } catch (error) {
            errorNotif(error);
            throw new Error(error);
        }
    },
);

export const sendNewEmailThunk = createAsyncThunk<void, void>('PROFILE/NEW_EMAIL', async () => {
    try {
        const { status } = await profileServices.sendNewEmail();
        if (status < 200 || status >= 300) throw new Error();
        toast.success('Лист успішно відправлено на вашу електронну пошту', toastConfig);
    } catch (error) {
        toast.error('Виникла помилка при відправленні листа!', toastConfig);
        throw new Error(error);
    }
});

export const changeEmailThunk = createAsyncThunk<IUser, ChangeEmailPayload>(
    'PROFILE/CHANGE_EMAIL',
    async (payload: ChangeEmailPayload) => {
        try {
            const { data, status } = await profileServices.changeEmail(payload);
            if (status < 200 || status >= 300) throw new Error();
            toast.success(
                'Ми надіслали вам листа на нову електронну пошту. Перейдіть за посиланням в ньому щоб верифікувати вашу нову пошту',
                toastConfig,
            );
            return data;
        } catch (error) {
            toast.error('Виникла помилка підчас зміни електронної пошти', toastConfig);
            throw new Error(error);
        }
    },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { banner } from '../../../components/common/banner/banner';
import toastConfig from '../../../config/toast.cofig';
import { IUser, UserRole } from '../../../interfaces';
import { VALIDATE_EMAIL_WARN } from '../../../utils/common-banners';
import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { AsyncThunkConfig } from '../../interfaces/common';
import { formatSeverError } from '../../utils';
import { getNotificationsCountThunk } from '../notifications/notifications.thunk';

import { ChangeEmailPayload, IUpdateProfilePayload } from './profile.interface';
import profileServices from './profile.services';

export const profileInfoThunk = createAsyncThunk<IUser, unknown, AsyncThunkConfig>(
    'PROFILE/INFO',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data, status } = await profileServices.getProfileInfo();
            if (status < 200 || status >= 300) throw new Error();

            if (!data.isEmailVerified) {
                banner.add(VALIDATE_EMAIL_WARN);
            }

            if (data) {
                dispatch(getNotificationsCountThunk());
            }

            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const updateProfileThunk = createAsyncThunk<IUser, IUpdateProfilePayload>(
    'PROFILE/UPDATE_PROFILE',
    async (payload: IUpdateProfilePayload, { rejectWithValue }) => {
        try {
            const { data, status } = await profileServices.updateProfile(payload);
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const updateProfileRoleThunk = createAsyncThunk<UserRole[], UserRole[]>(
    'PROFILE/UPDATE_ROLE',
    async (role: UserRole[], { rejectWithValue }) => {
        try {
            const { status } = await profileServices.updateProfileRole(role);
            if (status < 200 || status >= 300) throw new Error();
            toast.success('Ви успішно змінили роль на сайті!', toastConfig);
            return role;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

export const sendNewEmailThunk = createAsyncThunk<void, void>('PROFILE/NEW_EMAIL', async (_, { rejectWithValue }) => {
    try {
        const { status } = await profileServices.sendNewEmail();
        if (status < 200 || status >= 300) throw new Error();
        toast.success('Лист успішно відправлено на вашу електронну пошту', toastConfig);
    } catch (error) {
        errorNotif(error, 'Виникла помилка при відправленні листа!');
        return rejectWithValue(formatSeverError(error));
    }
});

export const changeEmailThunk = createAsyncThunk<IUser, ChangeEmailPayload>(
    'PROFILE/CHANGE_EMAIL',
    async (payload: ChangeEmailPayload, { rejectWithValue }) => {
        try {
            const { data, status } = await profileServices.changeEmail(payload);
            if (status < 200 || status >= 300) throw new Error();
            toast.success(
                'Ми надіслали вам листа на нову електронну пошту. Перейдіть за посиланням в ньому щоб верифікувати вашу нову пошту',
                toastConfig,
            );
            return data;
        } catch (error) {
            errorNotif(error, 'Виникла помилка підчас зміни електронної пошти');
            return rejectWithValue(formatSeverError(error));
        }
    },
);

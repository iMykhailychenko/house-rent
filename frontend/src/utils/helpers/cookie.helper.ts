import cookie from 'cookie';

import appConfig from '../../config/app.config';
import { HOUSE_RENT_AUTH, HOUSE_RENT_CONFIG, HOUSE_RENT_THEME } from '../../constant/cookie.constant';
import { IConfig, THEME_ENUM } from '../../interfaces';
import { IAuthResponse } from '../../state/entities/auth/auth.interface';
import api from '../interceptors';

interface ParseCookieParams<T> {
    value?: string;
    key: string;
    isJson?: boolean;
    defaultValue: T;
}

export const parseCookie = <T>({ value = '', key, isJson = false, defaultValue }: ParseCookieParams<T>): T => {
    try {
        return isJson ? cookie.parse(value)[key] || defaultValue : JSON.parse(cookie.parse(value)[key]);
    } catch (error) {
        return defaultValue;
    }
};

export const cookieConfig = (cookie?: string): IConfig =>
    parseCookie<IConfig>({
        value: cookie,
        key: HOUSE_RENT_CONFIG,
        defaultValue: appConfig,
    });

export const cookieTheme = (cookie?: string): THEME_ENUM =>
    parseCookie<THEME_ENUM>({
        value: cookie,
        key: HOUSE_RENT_THEME,
        defaultValue: THEME_ENUM.WHITE,
        isJson: true,
    });

export const cookieAuth = (cookie?: string): IAuthResponse => {
    const auth = parseCookie<IAuthResponse>({
        key: HOUSE_RENT_AUTH,
        value: cookie,
        defaultValue: { accessToken: null },
    });

    api.defaults.headers.common.Authorization = auth.accessToken || null;

    return auth;
};

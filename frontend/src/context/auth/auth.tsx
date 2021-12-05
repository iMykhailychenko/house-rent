import React, { createContext, useCallback, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { HOUSE_RENT_AUTH } from '../../constant/cookie.constant';
import { useAppDispatch } from '../../hooks/redux.hook';
import { IAuthResponse } from '../../state/entities/auth/auth.interface';
import api from '../../utils/interceptors';

const authInitialValue: IAuthResponse = { accessToken: null };
export type AuthHook = { token: IAuthResponse; setToken: (value: IAuthResponse) => void; logout: () => void };
export const Auth = createContext<AuthHook>({ token: authInitialValue, setToken: () => undefined, logout: () => undefined });

interface IProps {
    initValue: IAuthResponse;
    children: JSX.Element;
}

const AuthProvider = ({ initValue = authInitialValue, children }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [token, setToken] = useState<IAuthResponse>(initValue);
    api.defaults.headers.common.Authorization = token.accessToken;

    const logout = (): void => {
        setToken(authInitialValue);
        delete api.defaults.headers.common.Authorization;
        Cookies.remove(HOUSE_RENT_AUTH);
    };

    const logoutWithReload = (): void => {
        logout();
        window.location.reload();
    };

    const handleSetValue = useCallback((value: IAuthResponse) => {
        if (value.accessToken) {
            setToken(value);
            api.defaults.headers.common.Authorization = value.accessToken;
        } else {
            setToken(authInitialValue);
            delete api.defaults.headers.common.Authorization;
            Cookies.remove(HOUSE_RENT_AUTH);
        }
    }, []);

    useEffect(() => {
        try {
            handleSetValue(JSON.parse(Cookies.get(HOUSE_RENT_AUTH) || '') || null);
        } catch (error) {
            handleSetValue(authInitialValue);
        }
    }, [initValue, dispatch, handleSetValue]);

    return <Auth.Provider value={{ token, setToken, logout: logoutWithReload }}>{children}</Auth.Provider>;
};

export default AuthProvider;

import React, { createContext, ReactElement, useEffect, useState } from 'react';

import axios from 'axios';

import { useAppDispatch } from '../../hooks/redux.hook';
import authInitialState from '../../state/entities/auth/auth.initial-state';
import { IAuthState } from '../../state/entities/auth/auth.interface';
import { logoutAction } from '../../state/entities/auth/auth.reducer';
import { useAuthSelector } from '../../state/entities/auth/auth.selector';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';

export type AuthHook = [value: IAuthState | null, setAuth: (value: IAuthState | null) => void];
export const Auth = createContext<AuthHook>([authInitialState, () => undefined]);

interface IProps {
    authServer?: IAuthState | null;
    children: ReactElement;
}

const AuthProvider = ({ authServer = authInitialState, children }: IProps): ReactElement => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<IAuthState | null>(authInitialState);
    const auth = useAuthSelector();
    const profile = useProfileInfoSelector();

    useEffect(() => {
        if (process.browser) {
            if (auth?.accessToken) {
                setValue(auth);
                axios.defaults.headers.common.Authorization = auth.accessToken.includes('Bearer')
                    ? auth.accessToken
                    : `Bearer ${auth.accessToken}`;
            } else {
                setValue(authInitialState);
                dispatch(logoutAction());
            }
        } else {
            setValue(authServer);
        }
    }, [auth, authServer, dispatch]);

    useEffect(() => {
        if (profile.status === 'error') {
            setValue(authInitialState);
            dispatch(logoutAction());
        }
    }, [dispatch, profile]);

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default AuthProvider;

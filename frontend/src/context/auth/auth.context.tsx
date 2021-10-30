import React, { createContext, useEffect, useState } from 'react';

import axios from 'axios';

import { useAppDispatch } from '../../hooks/redux.hook';
import authInitialState from '../../state/entities/auth/auth.initial-state';
import { IAuthState } from '../../state/entities/auth/auth.interface';
import { logoutAction } from '../../state/entities/auth/auth.reducer';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';

export type AuthHook = [value: IAuthState | null, setAuth: (value: IAuthState | null) => void];
export const Auth = createContext<AuthHook>([authInitialState, () => undefined]);

interface IProps {
    auth?: IAuthState | null;
    children: JSX.Element;
}

const AuthProvider = ({ auth = authInitialState, children }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const profile = useProfileInfoSelector();
    const [value, setValue] = useState<IAuthState | null>(authInitialState);

    useEffect(() => {
        if (auth?.accessToken) {
            setValue(auth);
            axios.defaults.headers.common.Authorization = auth?.accessToken;
        } else {
            setValue(authInitialState);
            dispatch(logoutAction());
        }
    }, [auth, dispatch]);

    useEffect(() => {
        if (profile.status === 'error') {
            setValue(authInitialState);
            dispatch(logoutAction());
        }
    }, [dispatch, profile]);

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default AuthProvider;

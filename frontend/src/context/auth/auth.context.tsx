import React, { createContext, ReactElement, useEffect, useState } from 'react';

import axios from 'axios';

import authInitialState from '../../state/entities/auth/auth.initial-state';
import { IAuthState } from '../../state/entities/auth/auth.interface';
import { useAuthSelector } from '../../state/entities/auth/auth.selector';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import { dispatch } from 'jest-circus/build/state';
import { logoutAction } from '../../state/entities/auth/auth.reducer';
import { useAppDispatch } from '../../hooks/redux.hook';

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
        if (auth.accessToken) {
            setValue(auth);
            axios.defaults.headers.common.Authorization = auth.accessToken.includes('Bearer')
                ? auth.accessToken
                : `Bearer ${auth.accessToken}`;
        } else {
            setValue(authServer);
        }
    }, [auth, authServer]);

    useEffect(() => {
        if (profile.status === 'error') {
            setValue(authInitialState);
            dispatch(logoutAction());
        }
    }, [dispatch, profile]);

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default React.memo(AuthProvider);

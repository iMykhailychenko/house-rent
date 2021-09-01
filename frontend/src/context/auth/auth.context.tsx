import React, { createContext, ReactElement, useEffect, useState } from 'react';

import axios from 'axios';

import authInitialState from '../../state/entities/auth/auth.initial-state';
import { IAuthState } from '../../state/entities/auth/auth.interface';
import { useAuthSelector } from '../../state/entities/auth/auth.selector';

export type AuthHook = [value: IAuthState | null, setAuth: (value: IAuthState | null) => void];
export const Auth = createContext<AuthHook>([authInitialState, () => undefined]);

interface IProps {
    authServer?: IAuthState | null;
    children: ReactElement;
}

const AuthProvider = ({ authServer = authInitialState, children }: IProps): ReactElement => {
    const [value, setValue] = useState<IAuthState | null>(authInitialState);
    const auth = useAuthSelector();

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

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default React.memo(AuthProvider);

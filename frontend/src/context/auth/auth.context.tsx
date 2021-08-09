import React, { createContext, ReactElement, useEffect, useState } from 'react';

import authInitialState from '../../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../../state/entities/auth/auth.interface';
import { useAuthSelector } from '../../state/entities/auth/auth.selector';

export const Auth = createContext<[value: IAuthInitialState, setValue: ((value: IAuthInitialState) => void) | null]>([
    authInitialState,
    null,
]);

interface IProps {
    authServer?: IAuthInitialState;
    children: ReactElement;
}

const AuthProvider = ({ authServer = authInitialState, children }: IProps): ReactElement => {
    const [value, setValue] = useState<IAuthInitialState>(authInitialState);
    const auth = useAuthSelector();

    useEffect(() => {
        setValue(auth.accessToken ? auth : authServer);
    }, [auth, authServer]);

    return <Auth.Provider value={[value, setValue]}>{children}</Auth.Provider>;
};

export default React.memo(AuthProvider);

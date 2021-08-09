import React, { ReactElement } from 'react';

import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import AuthProvider from './auth/auth.context';

interface IProps {
    children: ReactElement;
    serverProps: {
        auth?: IAuthInitialState;
    };
}

const RootProvider = ({ serverProps, children }: IProps): ReactElement => {
    return <AuthProvider authServer={serverProps.auth}>{children}</AuthProvider>;
};

export default RootProvider;

import React, { ReactElement } from 'react';

import { Themes } from '../interfaces';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import AuthProvider from './auth/auth.context';
import MediaProvider from './media/media';
import ThemeProvider from './theme/theme';

interface IProps {
    children: ReactElement;
    serverProps: {
        auth: IAuthInitialState;
        theme: Themes;
        width: number;
    };
}

const RootProvider = ({ serverProps, children }: IProps): ReactElement => (
    <AuthProvider authServer={serverProps.auth}>
        <ThemeProvider serverTheme={serverProps.theme}>
            <MediaProvider width={serverProps.width}>{children}</MediaProvider>
        </ThemeProvider>
    </AuthProvider>
);

export default RootProvider;

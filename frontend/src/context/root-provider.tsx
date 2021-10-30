import React from 'react';

import { IConfig, THEME_ENUM } from '../interfaces';
import { IAuthState } from '../state/entities/auth/auth.interface';

import AuthProvider from './auth/auth.context';
import ConfigProvider from './config/config';
import MediaProvider from './media/media';
import ThemeProvider from './theme/theme';

interface IProps {
    children: JSX.Element[] | JSX.Element;
    serverProps: {
        auth: IAuthState;
        theme: THEME_ENUM;
        width: number;
        config: IConfig;
    };
}

const RootProvider = ({ serverProps, children }: IProps): JSX.Element => (
    <AuthProvider authServer={serverProps.auth}>
        <ThemeProvider serverTheme={serverProps.theme}>
            <ConfigProvider value={serverProps.config}>
                <MediaProvider width={serverProps.width}>{children}</MediaProvider>
            </ConfigProvider>
        </ThemeProvider>
    </AuthProvider>
);

export default RootProvider;

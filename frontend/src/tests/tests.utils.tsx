import React from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';

import AuthProvider from '../context/auth/auth';
import ConfigProvider from '../context/config/config';
import ThemeProvider from '../context/theme/theme';
import { IConfig, THEME_ENUM } from '../interfaces';
import { IAuthState } from '../state/entities/auth/auth.interface';
import { wrapper } from '../state/store';

interface IProps {
    children: JSX.Element;
}

interface ProvidersProps {
    auth: IAuthState;
    theme: THEME_ENUM;
    width: number;
    config: IConfig;
}

const customRender = (ui: JSX.Element, props?: ProvidersProps | null, options?: RenderOptions): RenderResult => {
    const AppProviders = ({ children }: IProps): JSX.Element => (
        <AuthProvider initValue={{ accessToken: 'Bearer test' }}>
            <ThemeProvider initValue={THEME_ENUM.WHITE}>
                <ConfigProvider>{children}</ConfigProvider>
            </ThemeProvider>
        </AuthProvider>
    );

    return render(ui, {
        wrapper: wrapper.withRedux(AppProviders),
        ...options,
    } as RenderOptions);
};

export * from '@testing-library/react';

export { customRender as render };

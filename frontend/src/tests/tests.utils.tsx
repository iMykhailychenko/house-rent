import React from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import appConfig from '../config/app.config';
import RootProvider from '../context/root-provider';
import { IConfig, THEME_ENUM } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthState } from '../state/entities/auth/auth.interface';
import { initializeStore } from '../state/store';

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
        <Provider store={initializeStore()}>
            <RootProvider
                serverProps={{
                    auth: props?.auth || authInitialState,
                    theme: props?.theme || THEME_ENUM.WHITE,
                    width: props?.width || 1300,
                    config: props?.config || appConfig,
                }}
            >
                {children}
            </RootProvider>
        </Provider>
    );

    return render(ui, {
        wrapper: AppProviders,
        ...options,
    } as RenderOptions);
};

export * from '@testing-library/react';

export { customRender as render };

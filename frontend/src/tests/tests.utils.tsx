import React, { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';

import appConfig from '../config/app.config';
import RootProvider from '../context/root-provider';
import { IConfig, THEME_ENUM } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import { initializeStore } from '../state/store';

interface IProps {
    children: ReactElement;
}

interface ProvidersProps {
    auth: IAuthInitialState;
    theme: THEME_ENUM;
    width: number;
    config: IConfig;
}

const customRender = (ui: ReactElement, props?: ProvidersProps | null, options?: RenderOptions): RenderResult => {
    const AppProviders = ({ children }: IProps): ReactElement => (
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

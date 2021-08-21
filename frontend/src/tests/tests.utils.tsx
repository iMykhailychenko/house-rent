import React, { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';

import appConfig from '../config/app.config';
import RootProvider from '../context/root-provider';
import ReduxProvider from '../core/redux-provider';
import { IConfig, THEME_ENUM } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';

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
        <ReduxProvider>
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
        </ReduxProvider>
    );

    return render(ui, {
        wrapper: AppProviders,
        ...options,
    } as RenderOptions);
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

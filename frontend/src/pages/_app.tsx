import '../styles/root.css';

import { ReactElement, useEffect } from 'react';

import axios from 'axios';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';

import ModalComponent from '../components/common/modal/modal';
import RootLayout from '../components/layout/root-layout/root-layout';
import appConfig from '../config/app.config';
import RootProvider from '../context/root-provider';
import ReduxProvider from '../core/redux-provider';
import { IConfig, THEME_ENUM } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import { parseCookie } from '../utils/helpers';

interface IProps {
    theme: THEME_ENUM;
    auth: IAuthInitialState;
    width: number;
    config: IConfig;
}

const HouseRentApp = ({ Component, pageProps, auth, theme, width, config }: AppProps & IProps): ReactElement => {
    useEffect(() => {
        const resize = (): void => document.body.style.setProperty('--100vh', window.innerHeight + 'px');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <ReduxProvider>
            <RootProvider serverProps={{ auth, theme, width, config }}>
                <RootLayout>
                    <Component {...pageProps} />
                    <ModalComponent />
                </RootLayout>
            </RootProvider>
        </ReduxProvider>
    );
};

HouseRentApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);

    const toMatch =
        /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    // site config
    const config = parseCookie<IConfig>({
        value: appContext?.ctx?.req?.headers?.cookie,
        key: 'house_rent_config',
        defaultValue: appConfig,
    });

    // site theme
    const theme = parseCookie<THEME_ENUM>({
        value: appContext?.ctx?.req?.headers?.cookie,
        key: 'house_rent_theme',
        defaultValue: THEME_ENUM.WHITE,
        isJson: true,
    });

    // auth
    const auth = parseCookie<IAuthInitialState>({
        key: 'house_rent_auth',
        value: appContext?.ctx?.req?.headers?.cookie,
        defaultValue: authInitialState,
    });
    if (auth.accessToken) axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;

    return { ...props, auth, theme, config, width: isMobile ? 450 : 1300 };
};

export default HouseRentApp;

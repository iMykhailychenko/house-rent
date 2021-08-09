import '../styles/theme.css';
import '../styles/styles.css';
import 'antd/dist/antd.css';

import Layout from 'antd/lib/layout/layout';
import axios from 'axios';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { ReactElement } from 'react';

import AppFooter from '../components/layout/footer/footer';
import AppHeader from '../components/layout/header/header';
import RootProvider from '../context/root-provider';
import ReduxProvider from '../core/redux-provider';
import { Themes } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import { parseCookie } from '../utils/helpers';

interface IProps {
    theme: Themes;
    auth: IAuthInitialState;
    width: number;
}

const HouseRentApp = ({ Component, pageProps, auth, theme, width }: AppProps & IProps): ReactElement => {
    return (
        <ReduxProvider>
            <RootProvider serverProps={{ auth, theme, width }}>
                <Layout>
                    <AppHeader />
                    <Component {...pageProps} />
                    <AppFooter />
                </Layout>
            </RootProvider>
        </ReduxProvider>
    );
};

HouseRentApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);

    const toMatch =
        /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    // // site theme
    const theme = parseCookie<Themes>({
        value: appContext?.ctx?.req?.headers?.cookie,
        key: 'house_rent_theme',
        defaultValue: 'white',
        isJson: true,
    });

    // auth-form
    const auth = parseCookie<IAuthInitialState>({
        key: 'house_rent_auth',
        value: appContext?.ctx?.req?.headers?.cookie,
        defaultValue: authInitialState,
    });
    if (auth.accessToken) axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;

    return { ...props, auth, theme, width: isMobile ? 450 : 1300 };
};

export default HouseRentApp;

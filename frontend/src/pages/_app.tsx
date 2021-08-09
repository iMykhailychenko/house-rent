import '../styles/styles.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { ReactElement } from 'react';

import RootProvider from '../context/root-provider';
import ReduxProvider from '../core/redux-provider';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthInitialState } from '../state/entities/auth/auth.interface';
import { parseCookie } from '../utils/helpers';

interface IProps {
    auth: IAuthInitialState;
}

const HouseRentApp = ({ Component, pageProps, auth }: AppProps & IProps): ReactElement => {
    return (
        <ReduxProvider>
            <RootProvider serverProps={{ auth }}>
                <Component {...pageProps} />
            </RootProvider>
        </ReduxProvider>
    );
};

HouseRentApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);

    // const toMatch =
    //     /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;
    // const isMobile = toMatch.test(appContext?.ctx?.req?.headers?.['user-agent'] || '');

    // // ui
    // const theme = parseCookie<Themes>(appContext?.ctx?.req?.headers?.cookie, 'phoqer_theme', true);
    // const props = await App.getInitialProps(appContext);

    // auth-form
    const auth = parseCookie<IAuthInitialState>({
        key: 'house_rent_auth',
        value: appContext?.ctx?.req?.headers?.cookie,
        defaultValue: authInitialState,
    });
    if (auth.accessToken) axios.defaults.headers.common.Authorization = `Bearer ${auth.accessToken}`;

    return { ...props, auth };
};

export default HouseRentApp;

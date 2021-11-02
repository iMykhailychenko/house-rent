import '../styles/root.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';

import axios from 'axios';
import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import ModalComponent, { modal } from '../components/common/modal/modal';
import appConfig from '../config/app.config';
import RootProvider from '../context/root-provider';
import { IConfig, THEME_ENUM } from '../interfaces';
import authInitialState from '../state/entities/auth/auth.initial-state';
import { IAuthState } from '../state/entities/auth/auth.interface';
import { initializeStore } from '../state/store';
import { parseCookie } from '../utils/helpers/cookie.helper';
import interceptor from '../utils/interceptors';

interface IProps {
    theme: THEME_ENUM;
    auth: IAuthState;
    width: number;
    config: IConfig;
}

const HouseRentApp = ({ Component, pageProps, auth, theme, width, config }: AppProps & IProps): JSX.Element => {
    const store = initializeStore(pageProps.state);
    interceptor(store.dispatch);

    useEffect(() => {
        const resize = (): void => document.body.style.setProperty('--100vh', window.innerHeight + 'px');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        const handleClear = () => {
            modal.close();
            window.scrollTo({ top: 0, behavior: 'auto' });
        };
        Router.events.on('routeChangeStart', handleClear);
        return () => {
            Router.events.off('routeChangeStart', handleClear);
        };
    }, []);

    return (
        <Provider store={store}>
            <RootProvider serverProps={{ auth, theme, width, config }}>
                <Component {...pageProps} />
                <ToastContainer />
                <ModalComponent />
            </RootProvider>
        </Provider>
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
    const auth = parseCookie<IAuthState>({
        key: 'house_rent_auth',
        value: appContext?.ctx?.req?.headers?.cookie,
        defaultValue: authInitialState,
    });
    axios.defaults.headers.common.Authorization = auth.accessToken ? `Bearer ${auth.accessToken}` : null;

    return { ...props, auth, theme, config, width: isMobile ? 450 : 1300 };
};

export default HouseRentApp;

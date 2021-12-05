import '../styles/root.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';
import { ToastContainer } from 'react-toastify';

import ModalComponent, { modal } from '../components/common/modal/modal';
import AuthProvider from '../context/auth/auth';
import ConfigProvider from '../context/config/config';
import ThemeProvider from '../context/theme/theme';
import { IConfig, THEME_ENUM } from '../interfaces';
import { IAuthResponse } from '../state/entities/auth/auth.interface';
import { wrapper } from '../state/store';
import { cookieAuth, cookieConfig, cookieTheme } from '../utils/helpers/cookie.helper';

interface IProps {
    theme: THEME_ENUM;
    config: IConfig;
    auth: IAuthResponse;
}

const HouseRentApp = ({ Component, pageProps, theme, config, auth }: AppProps & IProps): JSX.Element => {
    useEffect(() => {
        const resize = (): void => document.body.style.setProperty('--100vh', window.innerHeight + 'px');
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    useEffect(() => {
        const handleClear = () => {
            modal.close();
        };
        Router.events.on('routeChangeStart', handleClear);
        return () => {
            Router.events.off('routeChangeStart', handleClear);
        };
    }, []);

    return (
        <AuthProvider initValue={auth}>
            <ThemeProvider initValue={theme}>
                <ConfigProvider initValue={config}>
                    <>
                        <Component {...pageProps} />
                        <ToastContainer />
                        <ModalComponent />
                    </>
                </ConfigProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

HouseRentApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);
    const config = cookieConfig(appContext.ctx.req?.headers.cookie);
    const theme = cookieTheme(appContext.ctx.req?.headers.cookie);
    const auth = cookieAuth(appContext.ctx.req?.headers.cookie);

    return { ...props, theme, config, auth };
};

export default wrapper.withRedux(HouseRentApp);

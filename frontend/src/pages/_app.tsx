import '../styles/root.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import App from 'next/app';
import { AppContextType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';
import { ToastContainer } from 'react-toastify';

import ModalComponent, { modal } from '../components/common/modal/modal';
import appConfig from '../config/app.config';
import ConfigProvider from '../context/config/config';
import ThemeProvider from '../context/theme/theme';
import { IConfig, THEME_ENUM } from '../interfaces';
import { wrapper } from '../state/store';
import { parseCookie } from '../utils/helpers/cookie.helper';

interface IProps {
    theme: THEME_ENUM;
    config: IConfig;
}

const HouseRentApp = ({ Component, pageProps, theme, config }: AppProps & IProps): JSX.Element => {
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
        <ThemeProvider initValue={theme}>
            <ConfigProvider initValue={config}>
                <>
                    <Component {...pageProps} />
                    <ToastContainer />
                    <ModalComponent />
                </>
            </ConfigProvider>
        </ThemeProvider>
    );
};

HouseRentApp.getInitialProps = async (appContext: AppContextType<Router>): Promise<IProps> => {
    const props = await App.getInitialProps(appContext);

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

    return { ...props, theme, config };
};

export default wrapper.withRedux(HouseRentApp);

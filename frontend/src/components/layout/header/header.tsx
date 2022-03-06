import React, { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import toastConfig from '../../../config/toast.cofig';
import useAuth from '../../../hooks/auth.hook';
import { useNotificationSocket } from '../../../hooks/notifications.hook';
import { useAppDispatch } from '../../../hooks/redux.hook';
import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import { INotification } from '../../../state/entities/notifications/notifications.interface';
import { pushNotificationsAction } from '../../../state/entities/notifications/notifications.reducer';
import { getNotificationsCountThunk } from '../../../state/entities/notifications/notifications.thunk';
import routes from '../../../utils/routes';
import NotificationsTemplate from '../../common/notifications/notifications-template';
import Container from '../container/container';

import HeaderAuth from './header-auth/header-auth';
import HeaderLanguage from './header-language/header-language';
import HeaderUser from './header-user/header-user';
import css from './header.module.scss';

const AppHeader = (): JSX.Element => {
    const { token } = useAuth();
    const history = useRouter();
    const chatId = Number(history.query.chatId);
    const [theme] = useTheme();

    const dispatch = useAppDispatch();
    const socket = useNotificationSocket();

    useEffect(() => {
        if (token.accessToken) {
            dispatch(getNotificationsCountThunk());
        }
    }, [dispatch, token.accessToken]);

    useEffect(() => {
        if (socket?.client && token.accessToken) {
            const newNotification = (msg: INotification) => {
                dispatch(pushNotificationsAction(msg));
                if (!chatId || chatId !== msg.chatId) {
                    toast.success(<NotificationsTemplate value={msg} />, {
                        ...toastConfig,
                        autoClose: 15_000,
                    });
                }
            };
            socket.client.on('newNotification', newNotification);

            return () => {
                socket.client?.off('newNotification', newNotification);
                socket.unsubscribe();
            };
        }
    }, [dispatch, socket, socket?.client, token.accessToken, chatId]);

    return (
        <header id="header" className={css.header}>
            <Container className={css.inner} size="md">
                <div className={css.item}>
                    <Link href={routes.home}>
                        <a className={css.logo}>
                            <img src={theme === THEME_ENUM.BLACK ? '/logo-white.svg' : '/logo-black.svg'} alt="house rent" />
                        </a>
                    </Link>
                    {token.accessToken && <HeaderLanguage />}
                </div>

                <div className={css.item}>
                    {token.accessToken ? (
                        <HeaderUser />
                    ) : (
                        <>
                            <HeaderLanguage />
                            <HeaderAuth />
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
};

export default AppHeader;

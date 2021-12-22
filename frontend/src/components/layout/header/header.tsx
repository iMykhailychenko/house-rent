import React, { useEffect, useState } from 'react';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import toastConfig from '../../../config/toast.cofig';
import useAuth from '../../../hooks/auth.hook';
import { useNotificationSocket } from '../../../hooks/notifications.hook';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { INotification } from '../../../state/entities/notifications/notifications.interface';
import { pushNotificationsAction } from '../../../state/entities/notifications/notifications.reducer';
import { getNotificationsCountThunk } from '../../../state/entities/notifications/notifications.thunk';
import routes from '../../../utils/routes';
import Link from '../../common/link/link';
import MenuIcon from '../../common/menu-icon/menu-icon';
import NotificationsTemplate from '../../common/notifications/notifications-template';
import SwitchTheme from '../../common/switch-theme/switch-theme';
import AppDrawer from '../app-drawer/app-drawer';
import Container from '../container/container';

import HeaderAuth from './header-auth/header-auth';
import HeaderLanguage from './header-language/header-language';
import HeaderUser from './header-user/header-user';
import css from './header.module.scss';

interface IProps {
    withTheme?: boolean;
}

const AppHeader = ({ withTheme = true }: IProps): JSX.Element => {
    const { token } = useAuth();
    const history = useRouter();
    const chatId = +Number(history.query.chatId);

    const [drawer, setDrawer] = useState(false);
    const handleDrawerClose = (): void => setDrawer(false);
    const handleDrawerOpen = (): void => setDrawer(true);

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
        <>
            <header id="header" className={css.header}>
                <Container className={css.inner} size="md">
                    <div className={css.item}>
                        <MenuIcon className={css.menu} onClick={handleDrawerOpen} />
                        <HeaderLanguage />
                    </div>

                    <div className={css.item}>
                        <Link className={css.home} href={routes.home} type="button" secondary>
                            <HomeOutlinedIcon />
                        </Link>
                        {withTheme && <SwitchTheme className={css.theme} />}
                        {token.accessToken ? <HeaderUser /> : <HeaderAuth />}
                    </div>
                </Container>
            </header>
            <AppDrawer open={drawer} onClose={handleDrawerClose} />
        </>
    );
};

export default AppHeader;

import React from 'react';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import Drawer from '@mui/material/Drawer';

import useAuth from '../../../hooks/auth.hook';
import LoginForm from '../../common/auth/login-form/login-form';
import NotificationsList from '../../common/notifications/notifications-list';
import Container from '../container/container';

import css from './app-drawer.module.scss';
import AuthDrawerNav from './auth-drawer-nav';
import NotAuthDrawerNav from './not-auth-drawer-nav';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: IProps): JSX.Element => {
    const { token } = useAuth();
    return (
        <Drawer anchor="top" classes={{ paper: css.root }} open={open} onClose={onClose}>
            <div className={css.header}>
                <button className={css.close} type="button" onClick={onClose}>
                    <KeyboardArrowDownOutlinedIcon />
                </button>
            </div>

            <Container size="sm" className={css.container}>
                {token.accessToken ? <AuthDrawerNav /> : <NotAuthDrawerNav />}
            </Container>

            {token.accessToken && (
                <Container size="sm" className={css.notifications}>
                    <h2>Сповіщення</h2>
                    <NotificationsList />
                </Container>
            )}
        </Drawer>
    );
};

export default AppDrawer;

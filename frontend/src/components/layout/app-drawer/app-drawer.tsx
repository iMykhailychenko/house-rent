import React from 'react';

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import Drawer from '@mui/material/Drawer';
import ListSubheader from '@mui/material/ListSubheader';

import useAuth from '../../../hooks/auth.hook';
import LoginForm from '../../common/auth/login-form/login-form';
import Button from '../../common/button/button';
import NotificationsList from '../../common/notifications/notifications-list';

import AppDrawerNav from './app-drawer-nav';
import css from './app-drawer.module.scss';

interface IProps {
    open: boolean;
    onClose: () => void;
}

const AppDrawer = ({ open, onClose }: IProps): JSX.Element => {
    const { token } = useAuth();
    return (
        <Drawer classes={{ paper: css.root }} open={open} onClose={onClose}>
            <div className={css.inner}>
                <Button secondary className={css.menu} onClick={onClose}>
                    <KeyboardDoubleArrowLeftOutlinedIcon />
                </Button>
                <AppDrawerNav onClose={onClose} />

                {token.accessToken ? (
                    <>
                        <ListSubheader className={css.title} component="div">
                            Список повідомлень
                        </ListSubheader>
                        <NotificationsList />
                    </>
                ) : (
                    <LoginForm />
                )}
            </div>
        </Drawer>
    );
};

export default AppDrawer;

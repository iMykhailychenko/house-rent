import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoginIcon from '@mui/icons-material/Login';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useRouter } from 'next/router';

import routes from '../../../utils/routes';

import css from './app-drawer.module.scss';

const AppDrawerNav = (): JSX.Element => {
    const history = useRouter();

    return (
        <List
            className={css.list}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader className={css.title} component="div" id="nested-list-subheader">
                    Навігація по сайту
                </ListSubheader>
            }
        >
            <ListItemButton className={css.btn} onClick={() => history.push(routes.home)}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Перейти на головну" />
            </ListItemButton>

            <ListItemButton className={css.btn} onClick={() => history.push(routes.auth.join)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Створити акаунт" />
            </ListItemButton>

            <ListItemButton className={css.btn} onClick={() => history.push(routes.auth.login)}>
                <ListItemIcon>
                    <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Увійти в особистий кабінет" />
            </ListItemButton>

            <ListItemButton className={css.btn} onClick={() => history.push(routes.auth.reset)}>
                <ListItemIcon>
                    <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Відновити пароль" />
            </ListItemButton>
        </List>
    );
};

export default AppDrawerNav;

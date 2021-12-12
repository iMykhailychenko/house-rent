import React, { useState } from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InputIcon from '@mui/icons-material/Input';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { useRouter } from 'next/router';

import useAuth from '../../../hooks/auth.hook';
import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import { useMessageCountSelector } from '../../../state/entities/chats/chats.selector';
import routes from '../../../utils/routes';

import css from './app-drawer.module.scss';

const AppDrawerNav = (): JSX.Element => {
    const history = useRouter();
    const { token } = useAuth();
    const [theme, setTheme] = useTheme();

    const count = useMessageCountSelector();

    const [open, setOpen] = useState(false);
    const toggleOpen = (): void => setOpen(prev => !prev);

    const handleClick = (): void => {
        setTheme(theme === THEME_ENUM.WHITE ? THEME_ENUM.BLACK : THEME_ENUM.WHITE);
    };

    return (
        <>
            <List className={css.list} subheader={<ListSubheader className={css.title}>Налаштування</ListSubheader>}>
                <ListItem>
                    <ListItemIcon>
                        <LightModeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-theme" primary="Змінити тему" />
                    <Switch
                        edge="end"
                        onChange={handleClick}
                        checked={theme === THEME_ENUM.BLACK}
                        inputProps={{
                            'aria-labelledby': 'switch-list-label-theme',
                        }}
                    />
                </ListItem>
            </List>

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
                <ListItemButton className={css.btn} onClick={() => history.push(routes.home, undefined, { shallow: true })}>
                    <ListItemIcon>
                        <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Перейти на головну" />
                </ListItemButton>

                {token.accessToken ? (
                    <>
                        <ListItemButton onClick={toggleOpen}>
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Особистий кабінет" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    className={css.sub}
                                    onClick={() => history.push(routes.private, undefined, { shallow: true })}
                                >
                                    <ListItemText primary="Налаштування" />
                                </ListItemButton>
                            </List>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    className={css.sub}
                                    onClick={() => history.push(routes.myPosts, undefined, { shallow: true })}
                                >
                                    <ListItemText primary="Мої оголошення" />
                                </ListItemButton>
                            </List>
                            <List component="div" disablePadding>
                                <ListItemButton
                                    className={css.sub}
                                    onClick={() => history.push(routes.favorite, undefined, { shallow: true })}
                                >
                                    <ListItemText primary="Збережені оголошення" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                        <ListItemButton
                            className={css.btn}
                            onClick={() => history.push(routes.posts.new, undefined, { shallow: true })}
                        >
                            <ListItemIcon>
                                <ChatOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Мої повідомлення' + (count ? ` ${count}` : '')} />
                        </ListItemButton>

                        <ListItemButton
                            className={css.btn}
                            onClick={() => history.push(routes.posts.new, undefined, { shallow: true })}
                        >
                            <ListItemIcon>
                                <CreateNewFolderOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Створити оголошення" />
                        </ListItemButton>
                    </>
                ) : (
                    <>
                        <ListItemButton
                            className={css.btn}
                            onClick={() => history.push(routes.auth.join, undefined, { shallow: true })}
                        >
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Створити акаунт" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.btn}
                            onClick={() => history.push(routes.auth.login, undefined, { shallow: true })}
                        >
                            <ListItemIcon>
                                <InputIcon />
                            </ListItemIcon>
                            <ListItemText primary="Увійти в особистий кабінет" />
                        </ListItemButton>

                        <ListItemButton
                            className={css.btn}
                            onClick={() => history.push(routes.auth.reset, undefined, { shallow: true })}
                        >
                            <ListItemIcon>
                                <PasswordIcon />
                            </ListItemIcon>
                            <ListItemText primary="Відновити пароль" />
                        </ListItemButton>
                    </>
                )}
            </List>
        </>
    );
};

export default AppDrawerNav;

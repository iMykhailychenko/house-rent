import React from 'react';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Link from 'next/link';

import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import routes from '../../../utils/routes';

import css from './app-drawer.module.scss';

const NotAuthDrawerNav = (): JSX.Element => {
    const [theme, setTheme] = useTheme();

    const handleClick = (): void => {
        setTheme(theme === THEME_ENUM.WHITE ? THEME_ENUM.BLACK : THEME_ENUM.WHITE);
    };

    return (
        <ul className={css.ul}>
            <li className={css.li}>
                <Link href={routes.home}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <HomeOutlinedIcon />
                        </div>
                        <span>На главную</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.new}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <BorderColorOutlinedIcon />
                        </div>
                        <span>Створити оголошення</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.auth.login}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <LoginOutlinedIcon />
                        </div>
                        <span>Авторизуватись</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.auth.join}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <PersonAddOutlinedIcon />
                        </div>
                        <span>Створити акаунт</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.auth.reset}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <PasswordOutlinedIcon />
                        </div>
                        <span>Забули пароль?</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <button type="button" className={css.btn} onClick={handleClick}>
                    <div className={css.icon}>
                        <LightModeOutlinedIcon />
                    </div>
                    <span>Змінити тему</span>
                </button>
            </li>
        </ul>
    );
};

export default NotAuthDrawerNav;

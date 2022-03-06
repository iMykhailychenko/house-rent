import React from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Link from 'next/link';

import useTheme from '../../../hooks/theme.hook';
import { THEME_ENUM } from '../../../interfaces';
import routes from '../../../utils/routes';

import css from './app-drawer.module.scss';

const AuthDrawerNav = (): JSX.Element => {
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
                <Link href={routes.chats.init}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <ChatOutlinedIcon />
                        </div>
                        <span>Мої повідомлення</span>
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
                <Link href={routes.private}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <AccountCircleOutlinedIcon />
                        </div>
                        <span>Особистий кабінет</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.myPosts}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <DynamicFeedOutlinedIcon />
                        </div>
                        <span>Мої оголошення</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.favorite}>
                    <a className={css.btn}>
                        <div className={css.icon}>
                            <FavoriteBorderOutlinedIcon />
                        </div>
                        <span>Обрані оголошення</span>
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

export default AuthDrawerNav;

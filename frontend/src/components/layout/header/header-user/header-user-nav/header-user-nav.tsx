import React, { useState } from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { logoutAction } from '../../../../../state/entities/auth/auth.reducer';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import routes from '../../../../../utils/routes';

import css from './header-user-nav.module.scss';

const HeaderUserNav = (): JSX.Element => {
    const trans = useTrans();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const profileState = useProfileInfoSelector();

    const logout = (): void => {
        setLoading(true);
        dispatch(logoutAction());
        window.location.reload();
    };

    return (
        <ul>
            {loading && (
                <li className={css.li}>
                    <img src="/spinner.gif" alt="" />
                </li>
            )}
            <li className={css.li}>
                <Link href={routes.chats.init}>
                    <a className={css.btn}>
                        <ChatOutlinedIcon />
                        <span>{trans('Мої повідомлення')} (2)</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.private}>
                    <a className={css.btn}>
                        <DashboardOutlinedIcon />
                        <span>{trans('Особистий кабінет')}</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.users.profile(profileState.data.id)}>
                    <a className={css.btn}>
                        <AccountCircleOutlinedIcon />
                        <span>{trans('Проглянути свій профіль')}</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <Link href={routes.posts.new}>
                    <a className={css.btn}>
                        <CreateNewFolderOutlinedIcon />
                        <span>{trans('Створити оголошення')}</span>
                    </a>
                </Link>
            </li>
            <li className={css.li}>
                <button className={css.btn} type="button" onClick={logout}>
                    <LogoutIcon />
                    <span>{trans('Вийти')}</span>
                </button>
            </li>
        </ul>
    );
};

export default HeaderUserNav;

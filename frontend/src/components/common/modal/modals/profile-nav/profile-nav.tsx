import React, { useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import useAuth from '../../../../../hooks/auth.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import routes from '../../../../../utils/routes';
import SmallModalWrp from '../../components/small-modal-wrp/small-modal-wrp';
import { modal } from '../../modal';

import css from './profile-nav.module.scss';

export const ProfileNav = (): JSX.Element => {
    const trans = useTrans();
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const profileState = useProfileInfoSelector();

    const handleLogout = (): void => {
        setLoading(true);
        logout();
    };

    return (
        <SmallModalWrp title={`${profileState?.data?.firstName} ${profileState?.data?.lastName}`}>
            <ul>
                {loading && (
                    <li className={css.li}>
                        <img src="/spinner.gif" alt="" />
                    </li>
                )}
                <li className={css.li}>
                    <Link href={routes.private}>
                        <a className={css.btn}>{trans('Особистий кабінет')}</a>
                    </Link>
                </li>
                <li className={css.li}>
                    <Link href={routes.chats.init}>
                        <a className={css.btn}>{trans('Мої повідомлення')} (2)</a>
                    </Link>
                </li>
                <li className={css.li}>
                    <Link href={routes.users.profile(profileState.data.id)}>
                        <a className={css.btn}>{trans('Проглянути свій профіль')}</a>
                    </Link>
                </li>
                <li className={css.li}>
                    {profileState.data.isEmailVerified ? (
                        <Link href={routes.posts.new}>
                            <a className={css.btn}>{trans('Створити оголошення')}</a>
                        </Link>
                    ) : (
                        <p className={clsx(css.btn, css.disabled)}>{trans('Створити оголошення')}</p>
                    )}
                </li>
                <li className={css.li}>
                    <button type="button" onClick={handleLogout} className={clsx(css.btn, css.error)}>
                        {trans('Вийти')}
                    </button>
                </li>
            </ul>
        </SmallModalWrp>
    );
};

const profileNavModal = (): void => {
    modal.open(<ProfileNav />);
};

export default profileNavModal;
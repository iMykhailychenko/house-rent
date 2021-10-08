import React, { ReactElement } from 'react';

import ExitToApp from '@material-ui/icons/ExitToApp';
import PostAdd from '@material-ui/icons/PostAdd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { logoutAction } from '../../../../../state/entities/auth/auth.reducer';
import routes from '../../../../../utils/routes';

import css from './header-user-nav.module.scss';

const HeaderUserNav = (): ReactElement => {
    const trans = useTrans();
    const history = useRouter();
    const dispatch = useDispatch();

    const logout = (): void => {
        dispatch(logoutAction());
        window.location.reload();
    };

    const newPost = (): void => {
        history.push(routes.posts.new);
    };

    return (
        <ul>
            <li className={css.li}>
                <button className={css.btn} type="button" onClick={newPost}>
                    <PostAdd />
                    <span>{trans('Створити оголошення')}</span>
                </button>
                <button className={css.btn} type="button" onClick={logout}>
                    <ExitToApp />
                    <span>{trans('Вийти')}</span>
                </button>
            </li>
        </ul>
    );
};

export default HeaderUserNav;

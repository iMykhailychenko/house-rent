import React, { ReactElement } from 'react';

import { ExitToApp } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import useTrans from '../../../../../hooks/trans.hook';
import { logoutAction } from '../../../../../state/entities/auth/auth.reducer';
import { modal } from '../../../../common/modal/modal';

import css from './header-user-nav.module.scss';

const HeaderUserNav = (): ReactElement => {
    const trans = useTrans();
    const dispatch = useDispatch();

    const logout = (): void => {
        dispatch(logoutAction());
        modal.close();
    };

    return (
        <ul>
            <li className={css.li}>
                <button className={css.btn} type="button" onClick={logout}>
                    <ExitToApp />
                    <span>{trans('Вийти')}</span>
                </button>
            </li>
        </ul>
    );
};

export default HeaderUserNav;

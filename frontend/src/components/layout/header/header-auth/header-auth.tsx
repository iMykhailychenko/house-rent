import React from 'react';

import Person from '@mui/icons-material/Person';

import useTrans from '../../../../hooks/trans.hook';
import joinModal from '../../../common/modal/modals/join-modal/join-modal';
import loginModal from '../../../common/modal/modals/login-modal/login-modal';

import css from './header-auth.module.scss';

const HeaderAuth = (): JSX.Element => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            <Person />
            <button className={css.button} type="button" onClick={loginModal}>
                {trans('login')}
            </button>
            <button className={css.button} type="button" onClick={joinModal}>
                {trans('join')}
            </button>
        </div>
    );
};

export default HeaderAuth;

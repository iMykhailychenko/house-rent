import React, { ReactElement } from 'react';

import Person from '@mui/icons-material/Person';

import useTrans from '../../../../hooks/trans.hook';
import JoinForm from '../../../common/auth/join-form/join-form';
import LoginForm from '../../../common/auth/login-form/login-form';
import { modal } from '../../../common/modal/modal';
import SmallModalWrp from '../../../common/modal/small-modal-wrp/small-modal-wrp';

import css from './header-auth.module.scss';

const HeaderAuth = (): ReactElement => {
    const trans = useTrans();

    const login = (): void =>
        modal.open(
            <SmallModalWrp title="Увійти в особистий кабінет">
                <LoginForm />
            </SmallModalWrp>,
        );

    const join = (): void =>
        modal.open(
            <SmallModalWrp title="Зареєструватися">
                <JoinForm />
            </SmallModalWrp>,
        );

    return (
        <div className={css.root}>
            <Person />
            <button className={css.button} type="button" onClick={login}>
                {trans('login')}
            </button>
            <button className={css.button} type="button" onClick={join}>
                {trans('join')}
            </button>
        </div>
    );
};

export default HeaderAuth;

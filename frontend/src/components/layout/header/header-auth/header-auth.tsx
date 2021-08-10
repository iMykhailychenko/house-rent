import { Person } from '@material-ui/icons';
import React, { ReactElement } from 'react';

import useTrans from '../../../../context/trans/trans';
import css from './header-auth.module.scss';

const HeaderAuth = (): ReactElement => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            <Person />
            <button className={css.button} type="button">
                {trans('login')}
            </button>
            <button className={css.button} type="button">
                {trans('join')}
            </button>
        </div>
    );
};

export default HeaderAuth;

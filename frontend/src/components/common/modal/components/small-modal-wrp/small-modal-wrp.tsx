import React, { ReactElement } from 'react';

import Close from '@mui/icons-material/Close';

import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../modal';

import css from './small-modal-wrp.module.scss';

interface IProps {
    title?: string;
    children: ReactElement[] | ReactElement | string;
}

const SmallModalWrp = ({ title = '', children }: IProps): ReactElement => {
    const trans = useTrans();
    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <button className={css.btn} type='button' onClick={modal.close}>
                    <Close />
                </button>
            </header>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default SmallModalWrp;

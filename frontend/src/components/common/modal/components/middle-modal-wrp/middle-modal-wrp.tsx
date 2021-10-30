import React from 'react';

import Close from '@mui/icons-material/Close';

import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../modal';

import css from './middle-modal-wrp.module.scss';

interface IProps {
    title?: string;
    children: JSX.Element[] | JSX.Element | string;
}

const MiddleModalWrp = ({ children = '', title }: IProps): JSX.Element => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <button className={css.btn} type="button" onClick={modal.close}>
                    <Close />
                </button>
            </header>
            {children}
        </div>
    );
};

export default MiddleModalWrp;

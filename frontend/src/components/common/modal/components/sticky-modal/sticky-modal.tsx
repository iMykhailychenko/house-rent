import React from 'react';

import Close from '@mui/icons-material/Close';

import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../modal';

import css from './sticky-modal.module.scss';

interface IProps {
    title?: string;
    children: JSX.Element[] | JSX.Element | string;
    footer?: JSX.Element[] | JSX.Element;
}

const StickyModal = ({ title = '', footer, children }: IProps): JSX.Element => {
    const trans = useTrans();

    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <button type="button" className={css.btn} onClick={modal.close}>
                    <Close />
                </button>
            </header>
            <div className={css.inner}>{children}</div>
            {footer && <footer className={css.footer}>{footer}</footer>}
        </div>
    );
};

export default StickyModal;

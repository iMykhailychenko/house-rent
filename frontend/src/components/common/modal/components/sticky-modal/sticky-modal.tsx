import React, { ReactNode, useEffect, useRef } from 'react';

import Close from '@mui/icons-material/Close';
import clsx from 'clsx';

import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../modal';

import css from './sticky-modal.module.scss';

interface IProps {
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
}

const StickyModal = ({ title = '', footer, children }: IProps): JSX.Element => {
    const trans = useTrans();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ref.current?.focus();
        if (window.innerWidth < 768) {
            modal.setSticky();
        }
    }, []);

    return (
        <div ref={ref} tabIndex={0} className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <button type="button" className={css.btn} onClick={modal.close}>
                    <Close />
                </button>
            </header>
            <div className={clsx(css.inner, footer && css.withFooter)}>{children}</div>
            {footer && <footer className={css.footer}>{footer}</footer>}
        </div>
    );
};

export default StickyModal;

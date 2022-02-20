import React, { ReactNode, useEffect, useRef } from 'react';

import Close from '@mui/icons-material/Close';

import useTrans from '../../../../../hooks/trans.hook';
import { modal } from '../../modal';

import css from './large-modal-wrp.module.scss';

interface IProps {
    title?: string;
    children: ReactNode;
}

const LargeModalWrp = ({ children = '', title }: IProps): JSX.Element => {
    const trans = useTrans();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <div ref={ref} tabIndex={0} className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <button className={css.btn} type="button" onClick={modal.close}>
                    <Close />
                </button>
            </header>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default LargeModalWrp;

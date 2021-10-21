import React, { ReactElement, useEffect } from 'react';

import Close from '@mui/icons-material/Close';

import useMaxWidth from '../../../../hooks/media.hook';
import useTrans from '../../../../hooks/trans.hook';
import Button from '../../button/button';
import { modal } from '../modal';

import css from './sticky-modal.module.scss';

interface IProps {
    title?: string;
    children: ReactElement[] | ReactElement | string;
    footer?: ReactElement[] | ReactElement;
}

const StickyModal = ({ title = '', footer, children }: IProps): ReactElement => {
    const trans = useTrans();
    const media = useMaxWidth(768);

    useEffect(() => {
        const backdrop = document.getElementById('backdrop');
        if (backdrop) backdrop.style.alignItems = media ? 'center' : 'flex-end';
    }, [media]);

    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{trans(title)}</h2>
                <Button className={css.btn} secondary onClick={modal.close}>
                    <Close />
                </Button>
            </header>
            <div className={css.inner}>{children}</div>
            {footer && <footer className={css.footer}>{footer}</footer>}
        </div>
    );
};

export default StickyModal;

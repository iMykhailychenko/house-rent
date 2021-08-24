import React, { ReactElement, useEffect } from 'react';

import { Close } from '@material-ui/icons';

import useMaxWidth from '../../../../hooks/media.hook';
import Button from '../../button/button';
import { modal } from '../modal';

import css from './sticky-modal.module.scss';

interface IProps {
    title?: string;
    children: ReactElement[] | ReactElement | string;
}

const StickyModal = ({ title = '', children }: IProps): ReactElement => {
    const media = useMaxWidth(768);
    useEffect(() => {
        const backdrop = document.getElementById('backdrop');
        if (backdrop) backdrop.style.alignItems = media ? 'center' : 'flex-end';
    }, [media]);

    return (
        <div className={css.root}>
            <header className={css.header}>
                <h2 className={css.title}>{title}</h2>
                <Button className={css.btn} secondary onClick={modal.close}>
                    <Close />
                </Button>
            </header>
            <div className={css.inner}>{children}</div>
        </div>
    );
};

export default StickyModal;

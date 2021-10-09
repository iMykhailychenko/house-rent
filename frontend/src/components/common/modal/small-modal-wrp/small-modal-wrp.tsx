import React, { ReactElement } from 'react';

import Close from '@mui/icons-material/Close';

import useTrans from '../../../../hooks/trans.hook';
import Button from '../../button/button';
import { modal } from '../modal';

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
                <Button className={css.btn} secondary onClick={modal.close}>
                    <Close />
                </Button>
            </header>
            {children}
        </div>
    );
};

export default SmallModalWrp;

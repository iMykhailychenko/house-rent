import React, { ReactElement } from 'react';

import { Close } from '@material-ui/icons';

import Button from '../../button/button';
import { modal } from '../modal';

import css from './small-modal-wrp.module.scss';

interface IProps {
    title?: string;
    children: ReactElement[] | ReactElement | string;
}

const SmallModalWrp = ({ title, children }: IProps): ReactElement => (
    <div className={css.root}>
        {title && <h2 className={css.title}>{title}</h2>}
        <Button className={css.btn} secondary onClick={modal.close}>
            <Close />
        </Button>
        {children}
    </div>
);

export default SmallModalWrp;

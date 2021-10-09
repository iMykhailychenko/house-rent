import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { CSSTransition } from 'react-transition-group';

import css from './badge.module.scss';

interface IProps {
    className?: string;
    number?: number;
}

const Badge = ({ number = 0, className }: IProps): ReactElement => {
    return (
        <CSSTransition timeout={200} appear in={!!number}>
            <div className={clsx(css.number, className, { [css.big]: number > 10 })}>
                <span>{number < 10 ? number : '+9'}</span>
            </div>
        </CSSTransition>
    );
};

export default Badge;

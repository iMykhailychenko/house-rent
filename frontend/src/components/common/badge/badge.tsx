import React, { ReactElement } from 'react';

import clsx from 'clsx';

import css from './badge.module.scss';

interface IProps {
    className?: string;
    number?: number;
}

const Badge = ({ number = 0, className }: IProps): ReactElement | null => {
    return number ? (
        <div className={clsx(css.number, className, { [css.big]: number >= 10 })}>
            <span>{number < 10 ? number : '+9'}</span>
        </div>
    ) : null;
};

export default Badge;

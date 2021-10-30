import React from 'react';

import clsx from 'clsx';

import css from './rect-skeleton.module.scss';

interface IProps {
    className?: string;
    amount?: number;
}

const RectSkeleton = ({ className, amount = 1 }: IProps): JSX.Element => {
    const list = new Array(amount).fill(null);

    return (
        <>
            {list.map((_, index) => (
                <div className={clsx(css.rect, className)} key={index} />
            ))}
        </>
    );
};

export default RectSkeleton;

import React from 'react';

import clsx from 'clsx';

import RectSkeleton from '../rect-skeleton/rect-skeleton';
import TextSkeleton from '../text-skeleton/text-skeleton';

import css from './user-card-skeleton.module.scss';

interface IProps {
    className?: string;
}

const UserCardSkeleton = ({ className }: IProps): JSX.Element => {
    return (
        <div className={clsx(css.root, className)}>
            <RectSkeleton className={css.avatar} />
            <div className={css.wrp}>
                <TextSkeleton className={css.text} amount={2} />
            </div>
        </div>
    );
};

export default UserCardSkeleton;

import React from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';
import UserCardSkeleton from '../../user-card-skeleton/user-card-skeleton';
import css from '../posts-skeleton.module.scss';

interface IProps {
    className?: string;
    amount?: number;
}

const PostsMdSkeleton = ({ className, amount = 1 }: IProps): JSX.Element => {
    const list = new Array(amount).fill(null);

    return (
        <>
            {list.map(item => (
                <div key={item} className={clsx(css.md, className)}>
                    <RectSkeleton />
                    <TextSkeleton className={css.title} />
                    <TextSkeleton />
                    <TextSkeleton className={css.short} />
                    <UserCardSkeleton className={css.user} />

                    <div className={css.flex}>
                        <RectSkeleton className={css.actions} />
                        <RectSkeleton className={css.submit} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostsMdSkeleton;

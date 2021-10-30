import React from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';
import css from '../posts-skeleton.module.scss';

interface IProps {
    className?: string;
    amount?: number;
}

const PostsSmSkeleton = ({ className, amount = 1 }: IProps): JSX.Element => {
    const list = new Array(amount).fill(null);

    return (
        <>
            {list.map(item => (
                <div key={item} className={clsx(css.sm, className)}>
                    <RectSkeleton className={css.img} />
                    <TextSkeleton amount={2} />

                    <div className={css.flex}>
                        <RectSkeleton className={css.actions} />
                        <RectSkeleton className={css.submit} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostsSmSkeleton;

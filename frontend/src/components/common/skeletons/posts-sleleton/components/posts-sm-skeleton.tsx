import React from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';
import css from '../posts-skeleton.module.scss';

interface IProps {
    className?: string;
}

const PostsSmSkeleton = ({ className }: IProps): JSX.Element => {
    return (
        <div className={clsx(css.sm, className)}>
            <RectSkeleton className={css.img} />
            <TextSkeleton amount={2} />

            <div className={css.flex}>
                <RectSkeleton className={css.actions} />
                <RectSkeleton className={css.submit} />
            </div>
        </div>
    );
};

export default PostsSmSkeleton;

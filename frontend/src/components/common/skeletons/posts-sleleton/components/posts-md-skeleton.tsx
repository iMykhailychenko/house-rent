import React, { ReactElement } from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';
import UserCardSkeleton from '../../user-card-skeleton/user-card-skeleton';
import css from '../posts-skeleton.module.scss';

interface IProps {
    className?: string;
}

const PostsMdSkeleton = ({ className }: IProps): ReactElement => {
    return (
        <div className={clsx(css.md, className)}>
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
    );
};

export default PostsMdSkeleton;

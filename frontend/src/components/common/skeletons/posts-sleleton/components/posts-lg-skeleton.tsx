import React, { ReactElement } from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';
import UserCardSkeleton from '../../user-card-skeleton/user-card-skeleton';
import css from '../posts-skeleton.module.scss';

interface IProps {
    className?: string;
}

const PostsLgSkeleton = ({ className }: IProps): ReactElement => {
    return (
        <div className={clsx(css.lg, className)}>
            <UserCardSkeleton className={css.user} />

            <div className={css.flex}>
                <RectSkeleton className={css.img} />
                <div className={css.wrp}>
                    <TextSkeleton className={css.title} />
                    <TextSkeleton amount={2} />
                    <TextSkeleton className={css.short} />
                </div>
            </div>

            <div className={css.flex}>
                <div className={css.cell}>
                    <RectSkeleton className={css.chip} />
                    <RectSkeleton className={css.chip} />
                </div>
                <div className={css.cell}>
                    <RectSkeleton className={css.chip} />
                    <RectSkeleton className={css.chipLong} />
                </div>
                <div className={css.cell}>
                    <RectSkeleton className={css.chip} />
                </div>
                <div className={css.cell}>
                    <RectSkeleton className={css.chip} />
                    <RectSkeleton className={css.chip} />
                </div>
            </div>

            <div className={css.flex}>
                <RectSkeleton className={css.actions} />
                <RectSkeleton className={css.submit} />
            </div>
        </div>
    );
};

export default PostsLgSkeleton;

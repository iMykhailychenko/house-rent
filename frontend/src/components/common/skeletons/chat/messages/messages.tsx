import React, { ReactElement } from 'react';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';

import css from './messages.module.scss';

const MessagesSkeleton = (): ReactElement => {
    return (
        <>
            <div className={css.message}>
                <div className={css.user}>
                    <RectSkeleton className={css.avatar} />
                    <TextSkeleton className={css.name} />
                </div>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.message}>
                <div className={css.user}>
                    <RectSkeleton className={css.avatar} />
                    <TextSkeleton className={css.name} />
                </div>
                <TextSkeleton amount={3} />
            </div>
            <div className={css.message}>
                <div className={css.user}>
                    <RectSkeleton className={css.avatar} />
                    <TextSkeleton className={css.name} />
                </div>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.message}>
                <div className={css.user}>
                    <RectSkeleton className={css.avatar} />
                    <TextSkeleton className={css.name} />
                </div>
                <TextSkeleton amount={2} />
            </div>
            <div className={css.message}>
                <div className={css.user}>
                    <RectSkeleton className={css.avatar} />
                    <TextSkeleton className={css.name} />
                </div>
                <TextSkeleton amount={4} />
            </div>
        </>
    );
};

export default MessagesSkeleton;

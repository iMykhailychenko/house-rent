import React from 'react';

import clsx from 'clsx';

import RectSkeleton from '../../rect-skeleton/rect-skeleton';
import TextSkeleton from '../../text-skeleton/text-skeleton';

import css from './chat-item.module.scss';

interface IProps {
    className?: string;
    amount?: number;
}

const ChatItemSkeleton = ({ className, amount = 1 }: IProps): JSX.Element => {
    const list = new Array(amount).fill(null);

    return (
        <>
            {list.map((_, index) => (
                <div key={index} className={clsx(css.root, css.flex, className)}>
                    <RectSkeleton className={css.avatar} />
                    <div className={clsx(css.flex, css.inner)}>
                        <TextSkeleton className={css.text} amount={2} />
                        <TextSkeleton className={clsx(css.text, css.small)} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChatItemSkeleton;

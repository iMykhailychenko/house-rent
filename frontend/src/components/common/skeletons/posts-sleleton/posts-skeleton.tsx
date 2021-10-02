import React, { ReactElement } from 'react';

import useConfig from '../../../../hooks/config.hook';

import PostsLgSkeleton from './components/posts-lg-skeleton';
import PostsSmSkeleton from './components/posts-sm-skeleton';

interface IProps {
    className?: string;
    amount?: number;
}

const PostsSkeleton = ({ className, amount = 1 }: IProps): ReactElement => {
    const [config] = useConfig();
    const list = new Array(amount).fill(null);

    return (
        <>
            {list.map((_, index) =>
                config.cardSize === 'sm' ? (
                    <PostsSmSkeleton key={index} className={className} />
                ) : (
                    <PostsLgSkeleton key={index} className={className} />
                ),
            )}
        </>
    );
};

export default PostsSkeleton;

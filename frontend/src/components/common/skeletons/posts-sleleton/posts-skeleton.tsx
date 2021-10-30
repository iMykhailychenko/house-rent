import React from 'react';

import useConfig from '../../../../hooks/config.hook';

import PostsLgSkeleton from './components/posts-lg-skeleton';
import PostsMdSkeleton from './components/posts-md-skeleton';
import PostsSmSkeleton from './components/posts-sm-skeleton';

interface IProps {
    className?: string;
    amount?: number;
}

const PostsSkeleton = ({ className, amount = 1 }: IProps): JSX.Element => {
    const [config] = useConfig();

    const postSkeletonMap = {
        sm: <PostsSmSkeleton amount={amount} className={className} />,
        md: <PostsMdSkeleton amount={amount} className={className} />,
        lg: <PostsLgSkeleton amount={amount} className={className} />,
    };

    return postSkeletonMap[config.cardSize];
};

export default PostsSkeleton;

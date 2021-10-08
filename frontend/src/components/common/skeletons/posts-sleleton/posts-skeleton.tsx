import React, { Fragment, ReactElement } from 'react';

import useConfig from '../../../../hooks/config.hook';

import PostsLgSkeleton from './components/posts-lg-skeleton';
import PostsMdSkeleton from './components/posts-md-skeleton';
import PostsSmSkeleton from './components/posts-sm-skeleton';

interface IProps {
    className?: string;
    amount?: number;
}

const PostsSkeleton = ({ className, amount = 1 }: IProps): ReactElement => {
    const [config] = useConfig();
    const list = new Array(amount).fill(null);

    const postSkeletonMap = {
        sm: <PostsSmSkeleton className={className} />,
        md: <PostsMdSkeleton className={className} />,
        lg: <PostsLgSkeleton className={className} />,
    };

    return (
        <>
            {list.map((_, index) => (
                <Fragment key={index}>{postSkeletonMap[config.cardSize]}</Fragment>
            ))}
        </>
    );
};

export default PostsSkeleton;

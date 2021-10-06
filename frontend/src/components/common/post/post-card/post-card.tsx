import React, { ReactElement } from 'react';

import useConfig from '../../../../hooks/config.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';

import PostCardLg from './post-cart-lg/post-cart-lg';
import PostCardSm from './post-cart-sm/post-cart-sm';

interface IProps {
    post: IPost;
}

const PostCard = ({ post }: IProps): ReactElement => {
    const [config] = useConfig();

    const postCardMap = {
        sm: <PostCardSm post={post} />,
        lg: <PostCardLg post={post} />,
    };

    return postCardMap[config.cardSize || 'sm'];
};

export default PostCard;

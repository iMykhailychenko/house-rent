import React, { ReactElement } from 'react';

import useConfig from '../../../hooks/config.hook';
import PostCardLg from './post-cart-lg/post-cart-lg';
import PostCardSm from './post-cart-sm/post-cart-sm';

const PostCard = (): ReactElement => {
    const [config] = useConfig();

    const postCardMap = {
        sm: <PostCardSm />,
        lg: <PostCardLg />,
    };

    return postCardMap[config.cardSize];
};

export default PostCard;

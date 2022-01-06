import React from 'react';

import { CSSTransition } from 'react-transition-group';

import uiConfig from '../../../../config/ui.config';
import useConfig from '../../../../hooks/config.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';

import PostCardLg from './post-cart-lg/post-cart-lg';
import PostCardMd from './post-cart-md/post-cart-md';
import PostCardSm from './post-cart-sm/post-cart-sm';

interface IProps {
    post: IPost;
    index?: number;
}

const PostCard = ({ post, index = 0 }: IProps): JSX.Element => {
    const [config] = useConfig();
    const deltaIndex = (index % uiConfig.postsPerPage) + 1;

    const postCardMap = {
        sm: <PostCardSm post={post} />,
        md: <PostCardMd post={post} />,
        lg: <PostCardLg post={post} />,
    };

    return (
        <CSSTransition in timeout={100 + deltaIndex * 100} appear>
            {postCardMap[config.cardSize || 'sm']}
        </CSSTransition>
    );
};

export default PostCard;

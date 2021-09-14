import React, { ReactElement } from 'react';

import Link from 'next/link';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import UserCard from '../../user-card/user-card';
import PostCardFooter from '../post-card-footer/post-card-footer';

import css from './post-cart-sm.module.scss';

interface IProps {
    post: IPost;
}

const PostCardSm = ({ post }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            <UserCard
                user={{ avatar: post.user.avatar, firstName: post.user.firstName, lastName: post.user.lastName }}
                date={post.creationDate}
            />

            <div className={css.content}>
                <Link href={routes.posts.single(post.id)}>
                    <a className={css.link}>
                        <h3>{post.title}</h3>
                        <p>{cutString(post.description, 100)}</p>
                    </a>
                </Link>

                <PostCardFooter size="sm" post={post} />
            </div>
        </div>
    );
};

export default PostCardSm;

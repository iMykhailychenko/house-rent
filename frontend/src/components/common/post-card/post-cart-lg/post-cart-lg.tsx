import React, { ReactElement } from 'react';

import { Bookmark, Share, Visibility } from '@material-ui/icons';
import Link from 'next/link';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import Button from '../../button/button';
import UserCard from '../../user-card/user-card';
import PostInfoBlock from '../post-info-block/post-info-block';

import css from './post-cart-lg.module.scss';

interface IProps {
    post: IPost;
}

const PostCardLg = ({ post }: IProps): ReactElement => (
    <div className={css.root}>
        <UserCard
            user={{ avatar: post.user.avatar, firstName: post.user.firstName, lastName: post.user.lastName }}
            date={post.user.lastActivity}
        />

        <div className={css.content}>
            <Link href={routes.posts.single(post.id)}>
                <a className={css.link}>
                    <h3>{post.title}</h3>
                    <p>{cutString(post.description, 180)}</p>
                </a>
            </Link>

            <PostInfoBlock post={post} />

            <div className={css.info}>
                <Button secondary>
                    <Share />
                </Button>
                <Button secondary>
                    <Bookmark />
                </Button>
                <div className={css.visibility}>
                    <Visibility />
                    <span>{post.views}</span>
                </div>
            </div>
        </div>
    </div>
);

export default PostCardLg;

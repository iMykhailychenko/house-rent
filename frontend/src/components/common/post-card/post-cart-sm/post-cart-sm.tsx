import React, { ReactElement } from 'react';

import Link from 'next/link';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import FullScreenImg from '../../full-screen-img/full-screen-img';
import ImageWrp from '../../image-wrp/image-wrp';
import UserCard from '../../user-card/user-card';
import PostCardFooter from '../post-card-footer/post-card-footer';

import css from './post-cart-sm.module.scss';

interface IProps {
    post: IPost;
}

const PostCardSm = ({ post }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            {post.image ? (
                <FullScreenImg className={css.img} src={post.image} />
            ) : (
                <div className={css.noImg}>
                    <ImageWrp name="error" />
                    <p>Фото відсутнє</p>
                </div>
            )}

            <div className={css.content}>
                <Link href={routes.posts.single(post.id)}>
                    <a className={css.link}>
                        <h3>{post.title}</h3>
                        <p>{cutString(post.description, 80)}</p>
                    </a>
                </Link>

                <UserCard
                    className={css.card}
                    date={post.creationDate}
                    user={{
                        id: post.user.id,
                        avatar: post.user.avatar,
                        firstName: post.user.firstName,
                        lastName: post.user.lastName,
                    }}
                />

                <PostCardFooter size="sm" post={post} />
            </div>
        </div>
    );
};

export default PostCardSm;

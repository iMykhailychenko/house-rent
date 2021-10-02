import React, { ReactElement } from 'react';

import Link from 'next/link';

import { IPost } from '../../../../state/entities/posts/posts.interface';
import { cutString } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import FullScreenImg from '../../full-screen-img/full-screen-img';
import ImageWrp from '../../image-wrp/image-wrp';
import UserCard from '../../user-card/user-card';
import PostCardFooter from '../post-card-footer/post-card-footer';

import css from './post-cart-lg.module.scss';
import PostInfoBlock from './post-info-block/post-info-block';

interface IProps {
    post: IPost;
}

const PostCardLg = ({ post }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            <UserCard
                date={post.creationDate}
                user={{
                    id: post.user.id,
                    avatar: post.user.avatar,
                    firstName: post.user.firstName,
                    lastName: post.user.lastName,
                }}
            />

            <div className={css.content}>
                <div className={css.flex}>
                    {post.image ? (
                        <FullScreenImg className={css.img} src={post.image} />
                    ) : (
                        <div className={css.noImg}>
                            <ImageWrp name="error" />
                            <p>Фото відсутнє</p>
                        </div>
                    )}

                    <Link href={routes.posts.single(post.id)}>
                        <a className={css.link}>
                            <h3>{post.title}</h3>
                            <p>{cutString(post.description, 180)}</p>
                        </a>
                    </Link>
                </div>

                <PostInfoBlock post={post} />

                <PostCardFooter post={post} />
            </div>
        </div>
    );
};

export default PostCardLg;

import React from 'react';

import Link from 'next/link';

import { IPost } from '../../../../../state/entities/posts/posts.interface';
import routes from '../../../../../utils/routes';
import FullScreenImg from '../../../full-screen-img/full-screen-img';
import ImageWrp from '../../../image-wrp/image-wrp';
import PostCardFooter from '../components/post-card-footer/post-card-footer';

import css from './post-cart-sm.module.scss';

interface IProps {
    post: IPost;
}

const PostCardSm = ({ post }: IProps): JSX.Element => {
    return (
        <div className={css.root}>
            {post.image ? (
                <FullScreenImg className={css.img} src={post.image} />
            ) : (
                <Link href={routes.posts.single(post.id)}>
                    <a className={css.noImg}>
                        <ImageWrp name="error" />
                        <p>Фото відсутнє</p>
                    </a>
                </Link>
            )}

            <div className={css.content}>
                <Link href={routes.posts.single(post.id)}>
                    <a className={css.link}>
                        <h3>{post.title}</h3>
                    </a>
                </Link>

                <PostCardFooter size="sm" post={post} />
            </div>
        </div>
    );
};

export default PostCardSm;

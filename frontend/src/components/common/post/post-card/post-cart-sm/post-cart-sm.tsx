import React from 'react';

import { IPost } from '../../../../../state/entities/posts/posts.interface';
import routes from '../../../../../utils/routes';
import ImageWrp from '../../../image-wrp/image-wrp';
import PostCardFooter from '../components/post-card-footer/post-card-footer';

import css from './post-cart-sm.module.scss';

interface IProps {
    post: IPost;
}

const PostCardSm = ({ post }: IProps): JSX.Element => {
    return (
        <div className={css.root}>
            <a href={routes.posts.single(post.id)} target="_blank" rel="noopener noreferrer">
                {post.image ? (
                    <img className={css.img} src={post.image} alt={post.title} />
                ) : (
                    <div className={css.noImg}>
                        <ImageWrp name="error" />
                        <p>Фото відсутнє</p>
                    </div>
                )}
            </a>

            <div className={css.content}>
                <a href={routes.posts.single(post.id)} className={css.link} target="_blank" rel="noopener noreferrer">
                    <h3>{post.title}</h3>
                </a>

                <PostCardFooter size="sm" post={post} />
            </div>
        </div>
    );
};

export default PostCardSm;

import React from 'react';

import LaunchIcon from '@mui/icons-material/Launch';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import routes from '../../../../../utils/routes';
import Button from '../../../button/button';
import FullScreenImg from '../../../full-screen-img/full-screen-img';
import ImageWrp from '../../../image-wrp/image-wrp';
import { modal } from '../../../modal/modal';
import Tooltip from '../../../tooltip/tooltip';
import UserCard from '../../../user/user-card/user-card';
import PostCardFooter from '../components/post-card-footer/post-card-footer';
import PostInfoBlock from '../components/post-info-block/post-info-block';
import PostPreviewModal from '../components/post-preview-modal/post-preview-modal';

import css from './post-cart-lg.module.scss';

interface IProps {
    post: IPost;
}

const PostCardLg = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();

    const openPostPreview = (): void => {
        modal.open(<PostPreviewModal postId={post.id} />);
    };

    return (
        <div className={css.root}>
            <div className={css.flex}>
                <UserCard user={post.user} />

                <Tooltip content="Відкрити пост на весь екран">
                    <Button className={css.launch} secondary onClick={openPostPreview}>
                        <LaunchIcon />
                    </Button>
                </Tooltip>
            </div>

            <div className={css.content}>
                <div className={css.column}>
                    {post.image ? (
                        <FullScreenImg className={css.img} src={post.image} />
                    ) : (
                        <a href={routes.posts.single(post.id)} className={css.noImg} target="_blank" rel="noopener noreferrer">
                            <ImageWrp name="error" />
                            <p>Фото відсутнє</p>
                        </a>
                    )}

                    <a href={routes.posts.single(post.id)} className={css.link} target="_blank" rel="noopener noreferrer">
                        <h3>{post.title}</h3>
                        <p className={css.description}>{post.description}</p>
                        <p className={css.date}>Дата створення: {formatDate(post.createdAt, trans)}</p>
                    </a>
                </div>

                <PostInfoBlock post={post} />

                <PostCardFooter size="lg" post={post} />
            </div>
        </div>
    );
};

export default PostCardLg;

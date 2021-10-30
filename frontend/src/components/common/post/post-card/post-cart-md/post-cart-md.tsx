import React from 'react';

import LaunchIcon from '@mui/icons-material/Launch';
import Link from 'next/link';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { cutString, formatDate } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import Button from '../../../button/button';
import FullScreenImg from '../../../full-screen-img/full-screen-img';
import ImageWrp from '../../../image-wrp/image-wrp';
import { modal } from '../../../modal/modal';
import Tooltip from '../../../tooltip/tooltip';
import UserCard from '../../../user/user-card/user-card';
import PostCardFooter from '../components/post-card-footer/post-card-footer';
import PostPreviewModal from '../components/post-preview-modal/post-preview-modal';

import css from './post-cart-md.module.scss';

interface IProps {
    post: IPost;
}

const PostCardMd = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();

    const openPostPreview = (): void => {
        modal.open(<PostPreviewModal postId={post.id} />);
    };

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
                        <Tooltip classNameWrp={css.tooltip} content={post.title}>
                            <h3>{post.title}</h3>
                        </Tooltip>
                        <p>{cutString(post.description, 80)}</p>
                        <p className={css.date}>Дата створення: {formatDate(post.createdAt, trans)}</p>
                    </a>
                </Link>

                <div className={css.flex}>
                    <UserCard user={post.user} />
                    <Tooltip className={css.tooltip} content="Відкрити пост на весь екран">
                        <Button size="sm" secondary onClick={openPostPreview}>
                            <LaunchIcon />
                        </Button>
                    </Tooltip>
                </div>

                <PostCardFooter size="md" post={post} />
            </div>
        </div>
    );
};

export default PostCardMd;

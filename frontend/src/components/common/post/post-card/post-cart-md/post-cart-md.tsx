import React from 'react';

import LaunchIcon from '@mui/icons-material/Launch';

import useTrans from '../../../../../hooks/trans.hook';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import { cutString } from '../../../../../utils/helpers/string.helper';
import routes from '../../../../../utils/routes';
import Button from '../../../button/button';
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
            <a href={routes.posts.single(post.id)} target="_blank" rel="noopener noreferrer">
                <img className={css.img} src={post.image || 'no-image.svg'} alt={cutString(post.title, 80)} />
            </a>

            <div className={css.content}>
                <a href={routes.posts.single(post.id)} className={css.link} target="_blank" rel="noopener noreferrer">
                    <Tooltip className={css.tooltip} content={post.title}>
                        <h3>{post.title}</h3>
                    </Tooltip>
                    <p className={css.date}>Дата створення: {formatDate(post.createdAt, trans)}</p>
                </a>

                <div className={css.chips}>
                    {post.priceFilters.map(item => (
                        <span className={css.chip} key={item}>
                            {trans(item)}
                        </span>
                    ))}
                </div>

                <div className={css.flex}>
                    <UserCard user={post.user} />
                    <Tooltip content="Відкрити пост на весь екран">
                        <Button className={css.launch} secondary onClick={openPostPreview}>
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

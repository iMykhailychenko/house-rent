import React, { ReactElement } from 'react';

import { Bookmark, QuestionAnswer, Share, Visibility } from '@material-ui/icons';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';
import { addPostToFavoriteThunk, deletePostFromFavoriteThunk } from '../../../../state/entities/posts/posts.thunk';
import Button from '../../button/button';
import { modal } from '../../modal/modal';
import StickyModal from '../../modal/sticky-modal/sticky-modal';
import Tooltip from '../../tooltip/tooltip';
import SharePostModal from '../share-post-modal/share-post-modal';

import css from './post-card-footer.module.scss';

interface IProps {
    size?: 'sm' | 'md';
    post: IPost;
}

const PostCardFooter = ({ size = 'md', post }: IProps): ReactElement => {
    const dispatch = useAppDispatch();

    const openSharePostModal = (): void => {
        modal.open(
            <StickyModal>
                <SharePostModal post={post} />
            </StickyModal>,
        );
    };

    const handleFavorite = (): void => {
        post.isFavorite ? dispatch(deletePostFromFavoriteThunk(post.id)) : dispatch(addPostToFavoriteThunk(post.id));
    };

    return (
        <div className={css.flex}>
            <div className={css.info}>
                <Tooltip content="Поділитись оголошенням">
                    <Button size={size} secondary onClick={openSharePostModal}>
                        <Share />
                    </Button>
                </Tooltip>

                <Tooltip
                    className={css.tooltip}
                    content={
                        post.isFavorite
                            ? 'Натисніть щоб видалити оголошення з обраних'
                            : 'Додати оголошення в обрані. Натисніть якщо бажаете повернутись до цього оголошення пізніше'
                    }
                >
                    <Button size={size} primary={post.isFavorite} secondary={!post.isFavorite} onClick={handleFavorite}>
                        <Bookmark />
                    </Button>
                </Tooltip>

                <Tooltip content="Кількість переглядів">
                    <div className={css.icon}>
                        <Visibility />
                        <span>{post.views}</span>
                    </div>
                </Tooltip>

                <Tooltip content="Кількість відгуків">
                    <div className={css.icon}>
                        <QuestionAnswer />
                        <span>{post.chats}</span>
                    </div>
                </Tooltip>

                <Tooltip className={css.tooltip} content="Додано в обрані">
                    <div className={css.icon}>
                        <Bookmark />
                        <span>{post.favorite}</span>
                    </div>
                </Tooltip>
            </div>

            <Tooltip className={css.tooltip} content="Натисніть щоб розпочати чат з автором оголошення">
                <Button size={size} primary>
                    Відповісти
                </Button>
            </Tooltip>
        </div>
    );
};

export default PostCardFooter;

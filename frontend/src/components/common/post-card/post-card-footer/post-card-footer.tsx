import React, { ReactElement } from 'react';

import { Bookmark, QuestionAnswer, Share, Visibility } from '@material-ui/icons';

import useAuth from '../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { IPost } from '../../../../state/entities/posts/posts.interface';
import { togglePostFavoriteThunk } from '../../../../state/entities/posts/posts.thunk';
import LoginForm from '../../auth/login-form/login-form';
import Button from '../../button/button';
import { modal } from '../../modal/modal';
import SmallModalWrp from '../../modal/small-modal-wrp/small-modal-wrp';
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
    const [auth] = useAuth();
    const trans = useTrans();

    const loginForm = (): void => {
        modal.open(
            <SmallModalWrp>
                <LoginForm />
            </SmallModalWrp>,
        );
    };

    const openSharePostModal = (): void => {
        modal.open(
            <StickyModal>
                <SharePostModal post={post} />
            </StickyModal>,
        );
    };

    const toggleFavorite = (): void => {
        if (!auth?.accessToken) return loginForm();
        dispatch(togglePostFavoriteThunk(post.id));
    };

    const openChat = () => {
        if (!auth?.accessToken) return loginForm();
        console.log('openChat');
    };

    return (
        <div className={css.flex}>
            <div className={css.info}>
                <Tooltip
                    className={css.tooltip}
                    content={post.isFavorite ? 'remove_post_from_favorites' : 'add_post_to_favorites'}
                >
                    <Button size={size} primary={post.isFavorite} secondary={!post.isFavorite} onClick={toggleFavorite}>
                        <Bookmark />
                    </Button>
                </Tooltip>

                <Tooltip content="share_this_post">
                    <Button size={size} secondary onClick={openSharePostModal}>
                        <Share />
                    </Button>
                </Tooltip>

                <Tooltip content="views">
                    <div className={css.icon}>
                        <Visibility />
                        <span>{post.views}</span>
                    </div>
                </Tooltip>

                <Tooltip content="reviews">
                    <div className={css.icon}>
                        <QuestionAnswer />
                        <span>{post.chats}</span>
                    </div>
                </Tooltip>

                <Tooltip className={css.tooltip} content="added_to_favorites">
                    <div className={css.icon}>
                        <Bookmark />
                        <span>{post.favorite}</span>
                    </div>
                </Tooltip>
            </div>

            <Tooltip className={css.tooltip} content="click_to_start_chat">
                <Button size={size} primary onClick={openChat}>
                    {trans('answer')}
                </Button>
            </Tooltip>
        </div>
    );
};

export default PostCardFooter;

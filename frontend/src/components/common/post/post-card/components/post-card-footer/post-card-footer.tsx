import React, { ReactElement } from 'react';

import Bookmark from '@mui/icons-material/Bookmark';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import Share from '@mui/icons-material/Share';
import Visibility from '@mui/icons-material/Visibility';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import clsx from 'clsx';

import useAuth from '../../../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import useTrans from '../../../../../../hooks/trans.hook';
import { IPost } from '../../../../../../state/entities/posts/posts.interface';
import { togglePostFavoriteThunk } from '../../../../../../state/entities/posts/posts.thunk';
import LoginForm from '../../../../auth/login-form/login-form';
import Button from '../../../../button/button';
import { modal } from '../../../../modal/modal';
import SmallModalWrp from '../../../../modal/small-modal-wrp/small-modal-wrp';
import StickyModal from '../../../../modal/sticky-modal/sticky-modal';
import Tooltip from '../../../../tooltip/tooltip';
import PostPreviewModal from '../post-preview-modal/post-preview-modal';
import SharePostModal from '../share-post-modal/share-post-modal';

import css from './post-card-footer.module.scss';

interface IProps {
    size?: 'sm' | 'md' | 'lg';
    post: IPost;
}

const PostCardFooter = ({ size = 'md', post }: IProps): ReactElement => {
    const dispatch = useAppDispatch();
    const [auth] = useAuth();
    const trans = useTrans();

    const isSmallSize = size === 'sm';

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

    const openPostPreview = (): void => {
        modal.open(<PostPreviewModal postId={post.id} />);
    };

    return (
        <div className={clsx(css.flex, isSmallSize && css.smallSize)}>
            <div className={css.info}>
                <Tooltip
                    className={css.tooltip}
                    content={post.isFavorite ? 'remove_post_from_favorites' : 'add_post_to_favorites'}
                >
                    <Button
                        size="sm"
                        primary={post.isFavorite}
                        secondary={!post.isFavorite && !isSmallSize}
                        onClick={toggleFavorite}
                    >
                        <Bookmark />
                    </Button>
                </Tooltip>

                <Tooltip content="share_this_post">
                    <Button size="sm" secondary={!isSmallSize} onClick={openSharePostModal}>
                        <Share />
                    </Button>
                </Tooltip>

                {!isSmallSize && (
                    <>
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
                    </>
                )}
            </div>

            {!isSmallSize ? (
                <Tooltip className={css.tooltip} content="click_to_start_chat">
                    <Button size="sm" primary onClick={openChat}>
                        {trans('answer')}
                    </Button>
                </Tooltip>
            ) : (
                <Tooltip className={css.tooltip} content="Відкрити пост на весь екран">
                    <Button size="sm" onClick={openPostPreview}>
                        <ZoomOutMapIcon />
                    </Button>
                </Tooltip>
            )}
        </div>
    );
};

export default PostCardFooter;

import React from 'react';

import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LaunchIcon from '@mui/icons-material/Launch';
import QuestionAnswer from '@mui/icons-material/QuestionAnswer';
import Share from '@mui/icons-material/Share';
import Visibility from '@mui/icons-material/Visibility';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import useAuth from '../../../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { useRole } from '../../../../../../hooks/role.hook';
import useTrans from '../../../../../../hooks/trans.hook';
import { createChatThunk } from '../../../../../../state/entities/chats/chats.thunk';
import { IPost } from '../../../../../../state/entities/posts/posts.interface';
import { togglePostFavoriteThunk } from '../../../../../../state/entities/posts/thunks/post-favorite.thunk';
import { useProfileInfoSelector } from '../../../../../../state/entities/profile/profile.selector';
import routes from '../../../../../../utils/routes';
import Button from '../../../../button/button';
import { modal } from '../../../../modal/modal';
import loginModal from '../../../../modal/modals/login-modal/login-modal';
import sharePostModal from '../../../../modal/modals/share-post-modal/share-post-modal';
import Tooltip from '../../../../tooltip/tooltip';
import ChangeUserRole from '../../../../user/change-user-role/change-user-role';
import PostPreviewModal from '../post-preview-modal/post-preview-modal';

import css from './post-card-footer.module.scss';

interface IProps {
    size?: 'sm' | 'md' | 'lg';
    post: IPost;
}

const PostCardFooter = ({ size = 'md', post }: IProps): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();

    const role = useRole();
    const [auth] = useAuth();
    const history = useRouter();
    const profileState = useProfileInfoSelector();
    const isSmallSize = size === 'sm';

    const toggleFavorite = (): void => {
        if (!auth?.accessToken) return loginModal();
        dispatch(togglePostFavoriteThunk(post.id));
    };

    const changeUserRole = (): void => {
        modal.open(
            <ChangeUserRole title="Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?" />,
        );
    };

    const openChat = async () => {
        if (!auth?.accessToken) return loginModal();

        if (!role.isRealtor) {
            changeUserRole();
            return;
        }

        const chat = await dispatch(createChatThunk({ realtor: profileState.data.id, customer: post.user.id })).unwrap();
        history.push(routes.chats.messages(chat.id));
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
                        {post.isFavorite ? <Bookmark /> : <BookmarkBorderIcon />}
                    </Button>
                </Tooltip>

                <Tooltip content="share_this_post">
                    <Button size="sm" secondary={!isSmallSize} onClick={sharePostModal(post)}>
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

                        {profileState?.data?.id !== post.user.id && (
                            <Tooltip content="reviews">
                                <div className={css.icon}>
                                    <QuestionAnswer />
                                    <span>{post.chats}</span>
                                </div>
                            </Tooltip>
                        )}

                        <Tooltip className={css.tooltip} content="added_to_favorites">
                            <div className={css.icon}>
                                <BookmarkBorderIcon />
                                <span>{post.favorite}</span>
                            </div>
                        </Tooltip>
                    </>
                )}
            </div>

            {!isSmallSize ? (
                profileState?.data?.id === post.user.id ? (
                    <p className={css.author}>Ви є автором цього оголошення</p>
                ) : (
                    <Tooltip className={css.tooltip} content="click_to_start_chat">
                        <Button size="sm" primary onClick={openChat}>
                            {trans('answer')}
                        </Button>
                    </Tooltip>
                )
            ) : (
                <Tooltip className={css.tooltip} content="Відкрити пост на весь екран">
                    <Button size="sm" onClick={openPostPreview}>
                        <LaunchIcon />
                    </Button>
                </Tooltip>
            )}
        </div>
    );
};

export default PostCardFooter;

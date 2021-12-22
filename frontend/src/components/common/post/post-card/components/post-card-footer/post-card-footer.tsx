import React from 'react';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Share from '@mui/icons-material/Share';
import Visibility from '@mui/icons-material/Visibility';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import useAuth from '../../../../../../hooks/auth.hook';
import useMinMaxPrice from '../../../../../../hooks/min-max-price.hook';
import { useAppDispatch } from '../../../../../../hooks/redux.hook';
import { useRole } from '../../../../../../hooks/role.hook';
import useTrans from '../../../../../../hooks/trans.hook';
import { createChatThunk } from '../../../../../../state/entities/chats/chats.thunk';
import { IPost } from '../../../../../../state/entities/posts/posts.interface';
import { useProfileInfoSelector } from '../../../../../../state/entities/profile/profile.selector';
import routes from '../../../../../../utils/routes';
import Button from '../../../../button/button';
import changeUserRole from '../../../../modal/modals/change-user-role/change-user-role';
import loginModal from '../../../../modal/modals/login-modal/login-modal';
import postConfigModal from '../../../../modal/modals/post-config/post-config';
import sharePost from '../../../../modal/modals/share-post/share-post';
import Tooltip from '../../../../tooltip/tooltip';

import css from './post-card-footer.module.scss';

interface IProps {
    size?: 'sm' | 'md' | 'lg';
    post: IPost;
}

const PostCardFooter = ({ size = 'md', post }: IProps): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();

    const role = useRole();
    const { token } = useAuth();
    const history = useRouter();

    const minMaxPrice = useMinMaxPrice();
    const profileState = useProfileInfoSelector();
    const isSmallSize = size === 'sm';

    const openChat = async () => {
        if (!token.accessToken) return loginModal();

        if (!role.isRealtor) {
            changeUserRole(
                "Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?",
            );
            return;
        }

        const chat = await dispatch(createChatThunk({ realtor: profileState.data.id, customer: post.user.id })).unwrap();
        history.push(routes.chats.messages(chat.id));
    };

    const openPostConfig = () => {
        if (!token.accessToken) return loginModal();
        postConfigModal(post);
    };

    return (
        <div className={css.flex}>
            <div className={css.info}>
                <Tooltip className={clsx(isSmallSize && css.smallOptions)} content="Додаткові дії з цим постом">
                    <Button className={css.options} secondary onClick={openPostConfig}>
                        {isSmallSize ? <MoreVertOutlinedIcon /> : <SettingsOutlinedIcon />}
                    </Button>
                </Tooltip>

                <Tooltip content="share_this_post">
                    <Button className={css.share} onClick={sharePost(post)}>
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

                        <Tooltip content="added_to_favorites">
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
                    <Tooltip content="Ви є автором цього оголошення">
                        <div className={css.author}>
                            <DoneAllIcon />
                        </div>
                    </Tooltip>
                ) : (
                    <Tooltip content="click_to_start_chat">
                        <Button primary onClick={openChat}>
                            {trans('answer')}
                        </Button>
                    </Tooltip>
                )
            ) : (
                <p className={css.price}>{minMaxPrice(post.priceFilters)}</p>
            )}
        </div>
    );
};

export default PostCardFooter;

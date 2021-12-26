import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { useRole } from '../../../../../hooks/role.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { createChatThunk } from '../../../../../state/entities/chats/thunks/create-chat.thunk';
import { IPost } from '../../../../../state/entities/posts/posts.interface';
import { useConfigDataSelector } from '../../../../../state/entities/posts/posts.selector';
import { getIsPostFavoriteThunk, togglePostFavoriteThunk } from '../../../../../state/entities/posts/thunks/post-favorite.thunk';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { POST_ACTIONS, postActionsMap, postFunctionsMap } from '../../../../../utils/post-functions';
import routes from '../../../../../utils/routes';
import TextSkeleton from '../../../skeletons/text-skeleton/text-skeleton';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';
import changeUserRole from '../change-user-role/change-user-role';
import css from '../profile-nav/profile-nav.module.scss';
import sharePost from '../share-post/share-post';

interface IProps {
    post: IPost;
}

const UserPostActions = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();
    const history = useRouter();
    const actions = postActionsMap[post.status];
    const functions = postFunctionsMap(history);

    const handleAction = (action: POST_ACTIONS) => async (): Promise<void> => {
        await functions[action](post.id);
    };

    return (
        <>
            {actions.map(action => (
                <li key={action} className={css.li}>
                    <button type="button" className={css.btn} onClick={handleAction(action)}>
                        {trans(action)}
                    </button>
                </li>
            ))}
        </>
    );
};

export const PostConfig = ({ post }: IProps): JSX.Element => {
    const trans = useTrans();
    const role = useRole();
    const history = useRouter();
    const dispatch = useAppDispatch();

    const postData = useConfigDataSelector();
    const profileState = useProfileInfoSelector();
    const [loading, setLoading] = useState(true);
    const isAuthor = profileState.data.id === post.user.id;

    const openPost = (): void => {
        history.push(routes.posts.single(post.id));
    };

    useEffect(() => {
        if (!postData[post.id]?.id) {
            dispatch(getIsPostFavoriteThunk(post)).then(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [dispatch, post, postData]);

    const toggleFavorite = (): void => {
        dispatch(togglePostFavoriteThunk(post.id));
    };

    const openChat = async () => {
        if (!role.isRealtor) {
            changeUserRole(
                "Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?",
            );
            return;
        }

        const chat = await dispatch(createChatThunk({ realtor: profileState.data.id, customer: post.user.id })).unwrap();
        history.push(routes.chats.messages(chat.id));
    };

    return (
        <StickyModal title={post.title}>
            <ul>
                {loading ? (
                    [1, 2, 3, 4, 5].map(item => (
                        <li key={item} className={css.li}>
                            <div className={css.btn}>
                                <TextSkeleton />
                            </div>
                        </li>
                    ))
                ) : (
                    <>
                        <li className={css.li}>
                            <button type="button" className={css.btn} onClick={openPost}>
                                Переглянути пост
                            </button>
                        </li>

                        {isAuthor ? (
                            <UserPostActions post={post} />
                        ) : (
                            <li className={css.li}>
                                <button type="button" className={css.btn} onClick={openChat}>
                                    Написати повідомлення
                                </button>
                            </li>
                        )}

                        <li className={css.li}>
                            <button type="button" className={css.btn} onClick={sharePost(post)}>
                                Поділитись цим повідомленням
                            </button>
                        </li>

                        <li className={css.li}>
                            <button
                                type="button"
                                className={clsx(css.btn, {
                                    [css.error]: postData[post.id].isFavorite,
                                })}
                                onClick={toggleFavorite}
                            >
                                {trans(postData[post.id].isFavorite ? 'Видалити з обраних' : 'Додати в обрані')}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </StickyModal>
    );
};

const postConfigModal = (post: IPost): void => {
    modal.open(<PostConfig post={post} />);
};

export default postConfigModal;

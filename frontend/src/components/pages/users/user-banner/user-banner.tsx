import React, { useEffect, useState } from 'react';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import useAuth from '../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useRole } from '../../../../hooks/role.hook';
import useTrans from '../../../../hooks/trans.hook';
import { UserRole } from '../../../../interfaces';
import { createChatThunk } from '../../../../state/entities/chats/chats.thunk';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import { useUserRatingSelector } from '../../../../state/entities/rating/rating.selector';
import { canRateThunk } from '../../../../state/entities/rating/rating.thunk';
import { useUserInfoSelector } from '../../../../state/entities/users/users.selector';
import { onlineStatus } from '../../../../utils/helpers/date.helper';
import routes from '../../../../utils/routes';
import Button from '../../../common/button/button';
import changeUserRole from '../../../common/modal/modals/change-user-role/change-user-role';
import loginModal from '../../../common/modal/modals/login-modal/login-modal';
import rateUserModal from '../../../common/modal/modals/rate-user/rate-user';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';

import css from './user-banner.module.scss';

interface IRoleProps {
    text: string;
    title: string;
}

const RoleComponent = ({ text, title }: IRoleProps): JSX.Element => {
    const trans = useTrans();
    return (
        <p className={css.roleItem} title={trans(title)}>
            <PersonSearchIcon />
            <span>{trans(text)}</span>
        </p>
    );
};

const UserBanner = (): JSX.Element => {
    const role = useRole();
    const trans = useTrans();
    const { token } = useAuth();
    const dispatch = useAppDispatch();

    const history = useRouter();
    const userId = Number(history.query.userId);

    const userState = useUserInfoSelector();
    const profileState = useProfileInfoSelector();
    const ratingState = useUserRatingSelector();
    const online = profileState.data.id === userState.data.id ? 'online' : onlineStatus(userState.data.lastActivity, trans);
    const userData = token.accessToken && userState.data.id === profileState.data.id ? profileState.data : userState.data;

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (token.accessToken && userId) {
            dispatch(canRateThunk(userId));
        }
    }, [dispatch, token.accessToken, userId]);

    const changeUserRoleModal = (): void =>
        changeUserRole(
            "Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?",
        );

    const openChat = async (): Promise<void> => {
        if (!token.accessToken) return loginModal();
        if (!role.isRealtor) return changeUserRoleModal();

        setLoading(true);
        const chat = await dispatch(
            createChatThunk({
                realtor: profileState.data.id,
                customer: userState.data.id,
            }),
        ).unwrap();
        await history.push(routes.chats.messages(chat.id));
    };

    return (
        <div className={clsx(css.flex, css.box)}>
            <div className={css.cell}>
                <UserAvatar
                    diameter={25}
                    className={css.avatar}
                    src={userData.avatar}
                    firstName={userData.firstName}
                    lastName={userData.lastName}
                />
            </div>

            <div className={css.cell}>
                <h2 className={css.title}>
                    {userData.firstName} {userData.lastName}
                </h2>
                <p className={online === 'online' ? css.online : css.offline} title={online === 'online' ? 'online' : 'offline'}>
                    {online === 'online' ? online : 'Offline: ' + online}
                </p>
                <p className={css.text}>Рейтинг користувача:</p>
                <p className={css.small}>
                    Данний рейтинг будується на основі відгуків власників квартири/рієлторів після спілкування в чаті з
                    користувачем
                </p>
                <div className={css.flex}>
                    <Rating
                        className={css.rating}
                        name="half-rating-read"
                        value={ratingState.data.avg}
                        precision={0.1}
                        readOnly
                    />
                    <span>
                        {ratingState.data.avg} / {ratingState.data.total}
                    </span>
                </div>

                {ratingState.canRate && (
                    <Button secondary className={css.ratingBtn} onClick={() => rateUserModal(userData.id, true)}>
                        <StarIcon />
                        <span>{ratingState.isRated ? 'Редагувати оцінку' : 'Оцініть чат з користувачем'}</span>
                    </Button>
                )}

                <p className={css.text}>Роль на сайті:</p>
                <div className={css.role}>
                    {userData.role.includes(UserRole.USER) ? (
                        userData.role.includes(UserRole.REALTOR) ? (
                            <>
                                <RoleComponent text="Шукає житло" title="Роль на сайті" />
                                <RoleComponent text="Здає житло в оренду" title="Роль на сайті" />
                            </>
                        ) : (
                            <RoleComponent text="Шукає житло" title="Роль на сайті" />
                        )
                    ) : (
                        <RoleComponent text="Здає житло в оренду" title="Роль на сайті" />
                    )}
                </div>

                {profileState.data.id === userState.data.id ? (
                    <Button primary className={css.btn} onClick={changeUserRoleModal}>
                        Змінити роль на сайті
                    </Button>
                ) : (
                    <Button loading={loading} primary className={css.btn} onClick={openChat}>
                        Написати повідомлення
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserBanner;

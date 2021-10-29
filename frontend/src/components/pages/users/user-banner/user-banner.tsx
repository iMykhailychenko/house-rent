import React, { ReactElement, useState } from 'react';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useRouter } from 'next/router';

import useAuth from '../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useRole } from '../../../../hooks/role.hook';
import useTrans from '../../../../hooks/trans.hook';
import { UserRole } from '../../../../interfaces';
import { createChatThunk } from '../../../../state/entities/chats/chats.thunk';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import { useUserInfoSelector } from '../../../../state/entities/users/users.selector';
import { onlineStatus } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import Button from '../../../common/button/button';
import { modal } from '../../../common/modal/modal';
import loginModal from '../../../common/modal/modals/login-modal/login-modal';
import ChangeUserRole from '../../../common/user/change-user-role/change-user-role';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';

import css from './user-banner.module.scss';

interface IRoleProps {
    text: string;
    title: string;
}
const RoleComponent = ({ text, title }: IRoleProps): ReactElement => {
    const trans = useTrans();
    return (
        <p className={css.roleItem} title={trans(title)}>
            <PersonSearchIcon />
            <span>{trans(text)}</span>
        </p>
    );
};

const UserBanner = (): ReactElement => {
    const role = useRole();
    const trans = useTrans();
    const [auth] = useAuth();
    const history = useRouter();
    const dispatch = useAppDispatch();
    const userState = useUserInfoSelector();
    const profileState = useProfileInfoSelector();
    const online = profileState.data.id === userState.data.id ? 'online' : onlineStatus(userState.data.lastActivity, trans);

    const [loading, setLoading] = useState<boolean>(false);

    const changeUserRole = (): void => {
        modal.open(
            <ChangeUserRole title="Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?" />,
        );
    };

    const openChat = async (): Promise<void> => {
        if (!auth?.accessToken) return loginModal();
        if (!role.isRealtor) return changeUserRole();

        setLoading(true);
        const chat = await dispatch(createChatThunk({ realtor: profileState.data.id, customer: userState.data.id })).unwrap();
        history.push(routes.chats.messages(chat.id));
    };

    return (
        <div className={css.flex}>
            <UserAvatar
                diameter={25}
                className={css.avatar}
                src={userState.data.avatar}
                firstName={userState.data.firstName}
                lastName={userState.data.lastName}
            />
            <h2 className={css.title}>
                {userState.data.firstName} {userState.data.lastName}
            </h2>
            <p className={online === 'online' ? css.online : css.offline} title={online === 'online' ? 'online' : 'offline'}>
                {online}
            </p>
            <p className={css.text}>Роль на сайті:</p>
            <div className={css.role}>
                {userState.data.role.includes(UserRole.USER) ? (
                    userState.data.role.includes(UserRole.REALTOR) ? (
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

            {profileState.data.id === userState.data.id && (
                <button type="button" className={css.link} onClick={changeUserRole}>
                    Змінити роль на сайті
                </button>
            )}

            {profileState.data.id !== userState.data.id && (
                <Button loading={loading} primary className={css.btn} onClick={openChat}>
                    Написати повідомлення
                </Button>
            )}
        </div>
    );
};

export default UserBanner;

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import useTrans from '../../../../hooks/trans.hook';
import { IUser } from '../../../../interfaces';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import { onlineStatus } from '../../../../utils/helpers';
import routes from '../../../../utils/routes';
import UserAvatar from '../user-avatar/user-avatar';

import css from './user-card.module.scss';

interface IProps {
    user: IUser;
    className?: string;
}

const UserCard = ({ user, className }: IProps): JSX.Element => {
    const trans = useTrans();
    const profileState = useProfileInfoSelector();
    const online = profileState.data.id === user.id ? 'online' : onlineStatus(user.lastActivity, trans);

    return (
        <Link href={routes.users.profile(user.id)}>
            <a title={online === 'online' ? 'online' : 'offline'} className={clsx(css.root, className)}>
                <UserAvatar src={user.avatar} firstName={user.firstName} lastName={user.lastName} />
                <div className={css.info}>
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    <p className={online === 'online' ? css.online : css.offline}>{online}</p>
                </div>
            </a>
        </Link>
    );
};

export default UserCard;

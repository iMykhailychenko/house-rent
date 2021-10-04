import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { formatDate } from '../../../utils/helpers';
import routes from '../../../utils/routes';
import UserAvatar from '../user-avatar/user-avatar';

import css from './user-card.module.scss';

interface IProps {
    user: { id: number; avatar: string | null; firstName: string; lastName: string };
    date?: string;
    className?: string;
}

const UserCard = ({ user, className, date }: IProps): ReactElement => {
    return (
        <Link href={routes.users.profile(user.id)}>
            <a className={clsx(css.root, className)}>
                <UserAvatar src={user.avatar} firstName={user.firstName} lastName={user.lastName} />
                <div className={css.info}>
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    <p>{formatDate(date)}</p>
                </div>
            </a>
        </Link>
    );
};

export default UserCard;

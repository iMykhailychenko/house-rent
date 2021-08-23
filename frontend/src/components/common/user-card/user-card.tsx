import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { IUser } from '../../../state/entities/profile/profile.interface';
import routes from '../../../utils/routes';
import UserAvatar from '../user-avatar/user-avatar';

import css from './user-card.module.scss';

interface IProps {
    user: IUser;
    date?: string;
    className?: string;
}

const UserCard = ({ user, className, date }: IProps): ReactElement => {
    return (
        <Link href={routes.posts.single(1)}>
            <a className={clsx(css.root, className)}>
                <UserAvatar firstName={user.firstName} lastName={user.lastName} />
                <div className={css.info}>
                    <h4>{`${user.firstName} ${user.lastName}`}</h4>
                    {date && <p>{date}</p>}
                </div>
            </a>
        </Link>
    );
};

export default UserCard;

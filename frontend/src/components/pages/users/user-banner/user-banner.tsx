import React, { ReactElement } from 'react';

import useTrans from '../../../../hooks/trans.hook';
import { UserRole } from '../../../../interfaces';
import { useUserInfoSelector } from '../../../../state/entities/users/users.selector';
import { onlineStatus } from '../../../../utils/helpers';
import UserAvatar from '../../../common/user-avatar/user-avatar';

import css from './user-banner.module.scss';

const UserBanner = (): ReactElement => {
    const trans = useTrans();
    const userState = useUserInfoSelector();

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
            <p className={css.text}>{onlineStatus(userState.data.lastActivity, trans)}</p>
            <p className={css.text}>
                роль на сайті:{' '}
                {userState.data.role?.includes(UserRole.USER)
                    ? userState.data.role?.includes(UserRole.REALTOR)
                        ? 'шукає житло / здає житло в оренду'
                        : 'шукає житло'
                    : 'здає житло в оренду'}
            </p>
        </div>
    );
};

export default UserBanner;

import React, { ReactElement } from 'react';

import { useRole } from '../../../../hooks/role.hook';
import useTrans from '../../../../hooks/trans.hook';
import { UserRole } from '../../../../interfaces';
import { useUserInfoSelector } from '../../../../state/entities/users/users.selector';
import { onlineStatus } from '../../../../utils/helpers';
import Button from '../../../common/button/button';
import { modal } from '../../../common/modal/modal';
import StickyModal from '../../../common/modal/sticky-modal/sticky-modal';
import ChangeUserRole from '../../../common/user/change-user-role/change-user-role';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';

import css from './user-banner.module.scss';

const UserBanner = (): ReactElement => {
    const role = useRole();
    const trans = useTrans();
    const userState = useUserInfoSelector();

    const openChat = (): void => {
        if (!role.isRealtor) {
            modal.open(
                <StickyModal title="Змінити роль">
                    <ChangeUserRole title="Щоб написати повідомлення ви маєте указати свою роль на сайті як 'Власник квартири або рієлтор'. Змінити роль?" />
                </StickyModal>,
            );
        }
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
            <p className={css.text}>{onlineStatus(userState.data.lastActivity, trans)}</p>
            <p className={css.text}>
                роль на сайті:{' '}
                {userState.data.role.includes(UserRole.USER)
                    ? userState.data.role.includes(UserRole.REALTOR)
                        ? 'шукає житло / здає житло в оренду'
                        : 'шукає житло'
                    : 'здає житло в оренду'}
            </p>

            <Button primary className={css.btn} onClick={openChat}>
                Написати повідомлення
            </Button>
        </div>
    );
};

export default UserBanner;

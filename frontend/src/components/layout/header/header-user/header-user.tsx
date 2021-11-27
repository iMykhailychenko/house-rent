import React, { useState } from 'react';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import Badge from '../../../common/badge/badge';
import Button from '../../../common/button/button';
import StickyModal from '../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../common/modal/modal';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';
import HeaderNotification from '../header-notification/header-notification';

import HeaderUserNav from './header-user-nav/header-user-nav';
import css from './header-user.module.scss';

const HeaderUser = (): JSX.Element | null => {
    const profile = useProfileInfoSelector();

    const [notifications, setNotifications] = useState(false);
    const toggleNotifications = (): void => setNotifications(prev => !prev);

    const handleClick = (): void => {
        modal.open(
            <StickyModal title={`${profile?.data?.firstName} ${profile?.data?.lastName}`}>
                <HeaderUserNav />
            </StickyModal>,
        );
    };

    return profile.status === 'loading' ? (
        <div>loading...</div>
    ) : profile.data ? (
        <>
            <Button className={css.btn} secondary onClick={toggleNotifications}>
                <Badge className={css.badge} number={2} />
                <NotificationsNoneOutlinedIcon />
            </Button>

            <button type="button" className={css.flex} onClick={handleClick}>
                <UserAvatar src={profile.data?.avatar} firstName={profile.data.firstName} lastName={profile.data.lastName} />
                <div className={css.inner}>
                    <h3 className={css.title}>{`${profile.data.firstName} ${profile.data.lastName}`}</h3>
                    <p className={css.text}>{profile.data.email}</p>
                </div>
            </button>

            {notifications && <HeaderNotification onClose={toggleNotifications} />}
        </>
    ) : null;
};

export default HeaderUser;

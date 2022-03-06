import React, { useCallback, useEffect, useState } from 'react';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Router } from 'next/router';

import { useNotificationsCountSelector } from '../../../../state/entities/notifications/notifications.selector';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import Badge from '../../../common/badge/badge';
import Button from '../../../common/button/button';
import StickyModal from '../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../common/modal/modal';
import profileNavModal from '../../../common/modal/modals/profile-nav/profile-nav';
import NotificationsList from '../../../common/notifications/notifications-list';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';
import HeaderNotification from '../header-notification/header-notification';

import css from './header-user.module.scss';

const HeaderUser = (): JSX.Element | null => {
    const profile = useProfileInfoSelector();
    const notificationCount = useNotificationsCountSelector();

    const [notifications, setNotifications] = useState(false);
    const toggleNotifications = useCallback((): void => {
        if (window.innerWidth > 540) {
            document.body.style.overflow = !notifications ? 'hidden' : '';
            setNotifications(prev => !prev);
        } else {
            modal.open(
                <StickyModal>
                    <NotificationsList />
                </StickyModal>,
            );
        }
    }, [notifications]);

    useEffect(() => {
        const handleClear = (): void => {
            setNotifications(false);
        };
        Router.events.on('routeChangeStart', handleClear);
        return () => {
            Router.events.off('routeChangeStart', handleClear);
        };
    }, []);

    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return profile.status === 'loading' ? (
        <div>loading...</div>
    ) : profile.data ? (
        <>
            <Button className={css.notification} secondary onClick={toggleNotifications}>
                <Badge className={css.badge} number={notificationCount} />
                <NotificationsNoneOutlinedIcon />
            </Button>

            <button type="button" className={css.flex} onClick={profileNavModal}>
                <UserAvatar
                    className={css.avatar}
                    src={profile.data?.avatar}
                    firstName={profile.data.firstName}
                    lastName={profile.data.lastName}
                />
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

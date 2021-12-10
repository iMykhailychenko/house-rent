import React, { useCallback, useState } from 'react';

import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useRouter } from 'next/router';

import { useNotificationsCountSelector } from '../../../../state/entities/notifications/notifications.selector';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import routes from '../../../../utils/routes';
import Badge from '../../../common/badge/badge';
import Button from '../../../common/button/button';
import profileNavModal from '../../../common/modal/modals/profile-nav/profile-nav';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';
import HeaderNotification from '../header-notification/header-notification';

import css from './header-user.module.scss';

const HeaderUser = (): JSX.Element | null => {
    const history = useRouter();
    const profile = useProfileInfoSelector();
    const notificationCount = useNotificationsCountSelector();

    const [notifications, setNotifications] = useState(false);
    const toggleNotifications = useCallback((): void => {
        document.body.style.overflow = !notifications ? 'hidden' : '';
        setNotifications(prev => !prev);
    }, [notifications]);

    const createNewPost = (): void => {
        history.push(routes.posts.new);
    };

    return profile.status === 'loading' ? (
        <div>loading...</div>
    ) : profile.data ? (
        <>
            <Button className={css.btn} secondary onClick={createNewPost}>
                <CreateNewFolderOutlinedIcon />
            </Button>

            <Button className={css.btn} secondary onClick={toggleNotifications}>
                <Badge className={css.badge} number={notificationCount} />
                <NotificationsNoneOutlinedIcon />
            </Button>

            <button type="button" className={css.flex} onClick={profileNavModal}>
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

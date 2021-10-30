import React from 'react';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import Badge from '../../../common/badge/badge';
import Button from '../../../common/button/button';
import StickyModal from '../../../common/modal/components/sticky-modal/sticky-modal';
import { modal } from '../../../common/modal/modal';
import UserAvatar from '../../../common/user/user-avatar/user-avatar';

import HeaderUserNav from './header-user-nav/header-user-nav';
import css from './header-user.module.scss';

const HeaderUser = (): JSX.Element | null => {
    const profile = useProfileInfoSelector();

    const handleClick = (): void => {
        modal.open(
            <StickyModal title={`${profile?.data?.firstName} ${profile?.data?.lastName}`}>
                <HeaderUserNav />
            </StickyModal>,
        );
    };

    return profile.status === 'loading' ? (
        <div>loading...</div>
    ) : (
        profile.data && (
            <>
                <Button className={css.btn} secondary>
                    <Badge className={css.badge} number={2} />
                    <NotificationsNoneOutlinedIcon />
                </Button>

                <Button className={css.btn} onClick={handleClick} secondary>
                    <SettingsOutlinedIcon />
                </Button>

                <button type="button" className={css.flex} onClick={handleClick}>
                    <UserAvatar src={profile.data.avatar} firstName={profile.data.firstName} lastName={profile.data.lastName} />
                    <div className={css.inner}>
                        <h3 className={css.title}>{`${profile.data.firstName} ${profile.data.lastName}`}</h3>
                        <p className={css.text}>{profile.data.email}</p>
                    </div>
                </button>
            </>
        )
    );
};

export default HeaderUser;

import React, { ReactElement } from 'react';

import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import UserAvatar from '../../../common/user-avatar/user-avatar';

import css from './header-user.module.scss';

const HeaderUser = (): ReactElement | null => {
    const profile = useProfileInfoSelector();

    return profile.status === 'loading' ? (
        <div>loading...</div>
    ) : (
        profile.data && (
            <>
                <button type="button" className={css.flex}>
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

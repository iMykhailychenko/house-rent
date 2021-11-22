import React from 'react';

import Avatar from './components/avatar/avatar';
import ChangePassword from './components/change-password/change-password';
import EmailData from './components/email-data/email-data';
import PersonalData from './components/personal-data/personal-data';
import UserRoleSection from './components/user-role/user-role';
import css from './private.module.scss';

const PrivateComponent = (): JSX.Element => {
    return (
        <>
            <aside className={css.aside}>
                <div className={css.sticky}>
                    <Avatar />
                </div>
            </aside>
            <div className={css.container}>
                <PersonalData />
                <EmailData />
                <UserRoleSection />
                <ChangePassword />
            </div>
        </>
    );
};

export default PrivateComponent;

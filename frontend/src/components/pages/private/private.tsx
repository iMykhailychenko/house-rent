import React from 'react';

import Avatar from './components/avatar/avatar';
import PersonalData from './components/personal-data/personal-data';
import PersonalSection from './components/personal-section/personal-section';
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
                <UserRoleSection />
                <PersonalSection>
                    <>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, nam, qui! A adipisci architecto ea
                        eum non obcaecati, possimus quae quis! Expedita incidunt itaque quisquam rem tempora vel. Alias, in.
                    </>
                </PersonalSection>
            </div>
        </>
    );
};

export default PrivateComponent;

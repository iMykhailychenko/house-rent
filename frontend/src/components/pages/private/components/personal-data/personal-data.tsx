import React from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import PersonalSection from '../personal-section/personal-section';

import css from './personal-data.module.scss';

const PersonalData = (): JSX.Element => {
    return (
        <PersonalSection title="Личные данные" icon={<AccountCircleOutlinedIcon />}>
            <div className={css.root}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eligendi error est fugiat iure maxime molestiae nobis
                odit, pariatur reiciendis rem sit, unde velit? Earum labore magnam quas quos voluptas!
            </div>
        </PersonalSection>
    );
};

export default PersonalData;

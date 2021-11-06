import React from 'react';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import useTrans from '../../../../../hooks/trans.hook';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { formatDate } from '../../../../../utils/helpers/date.helper';
import PersonalSection from '../personal-section/personal-section';

import css from './personal-data.module.scss';

const PersonalData = (): JSX.Element => {
    const trans = useTrans();
    const profileState = useProfileInfoSelector().data;

    return (
        <PersonalSection title="Личные данные" icon={<AccountCircleOutlinedIcon />}>
            <div className={css.root}>
                <div className={css.cell}>
                    <h5>Фамилия</h5>
                    <p>{profileState.lastName}</p>
                </div>
                <div className={css.cell}>
                    <h5>Имя</h5>
                    <p>{profileState.firstName}</p>
                </div>
                <div className={css.cell}>
                    <h5>Дата регистрации</h5>
                    <p>{formatDate(profileState.createdAt, trans)}</p>
                </div>
            </div>
        </PersonalSection>
    );
};

export default PersonalData;

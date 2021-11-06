import React from 'react';

import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import changeUserRole from '../../../../common/modal/modals/change-user-role/change-user-role';
import PersonalSection from '../personal-section/personal-section';

import css from './user-role.module.scss';

const UserRoleSection = (): JSX.Element => {
    const profileState = useProfileInfoSelector().data;

    const changeUserRoleModal = () => changeUserRole('Змінити роль на сайті?');

    return (
        <PersonalSection title="Роль на сайті" icon={<SupervisedUserCircleOutlinedIcon />} onClick={changeUserRoleModal}>
            <ul className={css.list}>
                {profileState.role.map(role => (
                    <li className={css.role} key={role}>
                        <img src={`/icons/${role}_role.png`} alt="" />
                        <p>{role}</p>
                    </li>
                ))}
            </ul>
        </PersonalSection>
    );
};

export default UserRoleSection;

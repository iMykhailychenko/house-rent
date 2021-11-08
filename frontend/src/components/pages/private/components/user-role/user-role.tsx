import React from 'react';

import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

import { UserRole } from '../../../../../interfaces';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import changeUserRole from '../../../../common/modal/modals/change-user-role/change-user-role';
import Section from '../common/section';

import css from './user-role.module.scss';

const UserRoleSection = (): JSX.Element => {
    const profileState = useProfileInfoSelector().data;

    const changeUserRoleModal = () => changeUserRole('Змінити роль на сайті?');

    const descriptionMap = {
        [UserRole.USER]: 'Я зареєструвався на сайті щоб знайти квартиру своєї мрії',
        [UserRole.REALTOR]: 'Я зареєструвався на сайті бо маю чудову квартиру яка чикає на нових мешканців',
    };

    return (
        <Section title="Роль на сайті" icon={<SupervisedUserCircleOutlinedIcon />} onClick={changeUserRoleModal}>
            <ul className={css.list}>
                {profileState.role.map(role => (
                    <li className={css.role} key={role}>
                        <img src={`/icons/${role}_role.png`} alt="" />
                        <p>{role}</p>
                        <small>{descriptionMap[role]}</small>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export default UserRoleSection;

import React, { ReactElement, useState } from 'react';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import useTrans from '../../../../hooks/trans.hook';
import { UserRole } from '../../../../interfaces';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import { updateProfileRole } from '../../../../state/entities/profile/profile.thunk';
import Button from '../../button/button';
import Checkbox from '../../checkbox/checkbox';
import { modal } from '../../modal/modal';

import css from './change-user-role.module.scss';

interface IProps {
    title?: string;
    className?: string;
}

const ChangeUserRole = ({ title, className }: IProps): ReactElement => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const profileState = useProfileInfoSelector();
    const [userRoles, setUserRoles] = useState<UserRole[]>(profileState.data.role);
    const [loading, setLoading] = useState(false);

    const toggleUserCheckbox = (value: boolean): void =>
        value ? setUserRoles(prev => [UserRole.USER, ...prev]) : setUserRoles([UserRole.REALTOR]);

    const toggleRealtorCheckbox = (value: boolean): void =>
        value ? setUserRoles(prev => [UserRole.REALTOR, ...prev]) : setUserRoles([UserRole.USER]);

    const submit = async (): Promise<void> => {
        setLoading(true);
        await dispatch(updateProfileRole(userRoles)).unwrap();
        setLoading(false);
        modal.close();
    };

    return (
        <div className={className}>
            {title && <h3 className={css.title}>{title}</h3>}
            <div className={css.checkbox}>
                <Checkbox
                    size="lg"
                    title={trans('Користувач')}
                    value={userRoles.includes(UserRole.USER)}
                    onChange={toggleUserCheckbox}
                />
                <Checkbox
                    size="lg"
                    title={trans('Власник або рієлтор')}
                    value={userRoles.includes(UserRole.REALTOR)}
                    onChange={toggleRealtorCheckbox}
                />
            </div>

            <div className={css.flex}>
                <Button secondary onClick={modal.close}>
                    Скасувати
                </Button>
                <Button primary onClick={submit} loading={loading}>
                    Змінити
                </Button>
            </div>
        </div>
    );
};

export default ChangeUserRole;

import React, { useState } from 'react';

import { toast } from 'react-toastify';

import toastConfig from '../../../../../config/toast.cofig';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import useTrans from '../../../../../hooks/trans.hook';
import { UserRole } from '../../../../../interfaces';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { updateProfileRoleThunk } from '../../../../../state/entities/profile/profile.thunk';
import Button from '../../../button/button';
import Checkbox from '../../../checkbox/checkbox';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './change-user-role.module.scss';
import confirmDeleteUserRole from './components/confirm-delete-user-role';

interface IProps {
    title: string;
}

const ChangeUserRole = ({ title }: IProps): JSX.Element => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const profileState = useProfileInfoSelector();

    const [userRoles, setUserRoles] = useState<UserRole[]>(profileState.data.role);
    const [loading, setLoading] = useState(false);

    const toggleUserCheckbox = (value: boolean): void =>
        value
            ? setUserRoles(prev => (prev.length === 1 ? [UserRole.USER, UserRole.REALTOR] : [UserRole.USER]))
            : setUserRoles([UserRole.REALTOR]);

    const toggleRealtorCheckbox = (value: boolean): void =>
        value
            ? setUserRoles(prev => (prev.length === 1 ? [UserRole.USER, UserRole.REALTOR] : [UserRole.REALTOR]))
            : setUserRoles([UserRole.USER]);

    const submit = async (): Promise<void> => {
        const isEqual =
            profileState.data.role.length === userRoles.length && profileState.data.role.every(item => userRoles.includes(item));
        if (isEqual) {
            toast.warn('Ви не змінили роль, змініть роль або натисніть "Скасувати"', { ...toastConfig, toastId: 'user-role' });
            return;
        }

        setLoading(true);
        const onSubmit = async (): Promise<void> => {
            await dispatch(updateProfileRoleThunk(userRoles));
            modal.close();
        };

        if (profileState.data.role.includes(UserRole.USER) && !userRoles.includes(UserRole.USER)) {
            confirmDeleteUserRole({ loading, onSubmit });
            return;
        }

        await onSubmit();
    };

    return (
        <StickyModal
            title="Змінити роль"
            footer={
                <>
                    <Button secondary onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary className={css.primary} onClick={submit} loading={loading}>
                        Змінити
                    </Button>
                </>
            }
        >
            <div>
                <h3 className={css.title}>{title}</h3>
                <div className={css.checkbox}>
                    <Checkbox
                        size="lg"
                        title={trans('Шукаю квартиру')}
                        small={trans('Я зареєструвався на сайті щоб знайти квартиру своєї мрії')}
                        value={userRoles.includes(UserRole.USER)}
                        onChange={toggleUserCheckbox}
                    />
                    <Checkbox
                        size="lg"
                        title={trans('Власник / Рієлтор')}
                        small={trans('Я зареєструвався на сайті бо маю чудову квартиру яка чикає на нових мешканців')}
                        value={userRoles.includes(UserRole.REALTOR)}
                        onChange={toggleRealtorCheckbox}
                    />
                </div>
            </div>
        </StickyModal>
    );
};

const changeUserRole = (title = ''): void => {
    modal.open(<ChangeUserRole title={title} />);
};

export default changeUserRole;

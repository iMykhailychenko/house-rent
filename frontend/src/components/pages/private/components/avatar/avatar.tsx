import React, { ChangeEvent, useRef } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { toast } from 'react-toastify';

import toastConfig from '../../../../../config/toast.cofig';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { mediaThunk } from '../../../../../state/entities/media/media.reducer';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { updateProfileThunk } from '../../../../../state/entities/profile/profile.thunk';
import { errorNotif } from '../../../../../utils/helpers/error-logger.helper';
import Button from '../../../../common/button/button';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';

import css from './avatar.module.scss';

const Avatar = (): JSX.Element => {
    const ref = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const profileState = useProfileInfoSelector();

    const handleClick = (): void => {
        ref.current?.click();
    };

    const changePhoto = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (event.target.files?.[0]) {
            try {
                const image = await dispatch(mediaThunk(event.target.files[0])).unwrap();
                const data = await dispatch(updateProfileThunk({ avatar: image.url })).unwrap();
                if (!data?.id) throw new Error();
                toast.success('Ви успішно замінили фото профілю!', toastConfig);
            } catch (error) {
                errorNotif(error);
            }
        }
    };

    const deletePhoto = async (): Promise<void> => {
        try {
            const data = await dispatch(updateProfileThunk({ avatar: null })).unwrap();
            if (!data?.id) throw new Error();
            toast.success('Ви успішно видалили фото профілю!', toastConfig);
        } catch (error) {
            errorNotif(error);
        }
    };

    return (
        <div className={css.root} aria-hidden="true">
            <button className={css.avatarWrp} type="button" onClick={handleClick}>
                <UserAvatar
                    diameter={25}
                    className={css.avatar}
                    src={profileState.data.avatar}
                    firstName={profileState.data.firstName}
                    lastName={profileState.data.lastName}
                />
            </button>

            <input ref={ref} type="file" className={css.input} onChange={changePhoto} accept=".jpg, .jpeg, .png" />

            <Button onClick={handleClick} className={css.btn} secondary>
                <SyncIcon />
                <span>Змінити фото</span>
            </Button>
            {profileState.data.avatar && (
                <Button onClick={deletePhoto} className={css.delete} secondary>
                    <DeleteOutlineOutlinedIcon />
                    <span>Видалити фото</span>
                </Button>
            )}
        </div>
    );
};

export default Avatar;

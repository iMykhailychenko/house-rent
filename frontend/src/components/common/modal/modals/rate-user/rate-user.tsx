import React, { useState } from 'react';

import Rating from '@mui/material/Rating';

import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { useUserRatingSelector } from '../../../../../state/entities/rating/rating.selector';
import { editRateUserThunk, getRatingThunk, rateUserThunk } from '../../../../../state/entities/rating/rating.thunk';
import Button from '../../../button/button';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';

import css from './rate-user.module.scss';

interface IProps {
    userId: number;
    withUpdate: boolean;
}
export const RateUser = ({ userId, withUpdate }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const ratingState = useUserRatingSelector();

    const [loading, setLoading] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const handleChange = (_: unknown, value: number | null): void => {
        setRating(value || 0);
        setError('');
    };

    const handleSubmit = async (): Promise<void> => {
        if (!rating) {
            setError('Укажіть вашу оцінку');
            return;
        }

        setLoading(true);
        if (ratingState.isRated) {
            await dispatch(editRateUserThunk({ userId, value: rating }));
        } else {
            await dispatch(rateUserThunk({ userId, value: rating }));
        }

        if (withUpdate) {
            await dispatch(getRatingThunk(userId));
        }
        modal.close();
    };

    return (
        <StickyModal
            title="Оцінити користувача"
            footer={
                <>
                    <Button secondary loading={loading} onClick={modal.close}>
                        Скасувати
                    </Button>
                    <Button primary loading={loading} onClick={handleSubmit}>
                        {ratingState.isRated ? 'Змінити' : 'Оцінити'}
                    </Button>
                </>
            }
        >
            <>
                <p>Укажіть, чи рекомендували б ви іншим власникам здавати квартиру цьому користувачу</p>
                {ratingState.isRated && <p>Змінити попередню оцінку</p>}
                <Rating className={css.rating} value={rating} precision={1} onChange={handleChange} />
                {error && <p className={css.error}>{error}</p>}
            </>
        </StickyModal>
    );
};

interface Params {
    userId: number;
    withRatingThunkCall?: boolean;
}

const rateUserModal = ({ userId, withRatingThunkCall = false }: Params): void => {
    modal.open(<RateUser userId={userId} withUpdate={withRatingThunkCall} />);
};

export default rateUserModal;

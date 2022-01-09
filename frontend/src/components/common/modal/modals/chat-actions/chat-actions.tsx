import React, { useEffect, useState } from 'react';

import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import HPlusMobiledataOutlinedIcon from '@mui/icons-material/HPlusMobiledataOutlined';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import clsx from 'clsx';

import useAuth from '../../../../../hooks/auth.hook';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import userId from '../../../../../pages/users/[userId]';
import { useSingleChatInfoSelector } from '../../../../../state/entities/chats/chats.selector';
import { useProfileInfoSelector } from '../../../../../state/entities/profile/profile.selector';
import { useUserRatingSelector } from '../../../../../state/entities/rating/rating.selector';
import { canRateThunk } from '../../../../../state/entities/rating/rating.thunk';
import StickyModal from '../../components/sticky-modal/sticky-modal';
import { modal } from '../../modal';
import chatFontSize from '../chat-font-size/chat-font-size';
import rateUserModal from '../rate-user/rate-user';

import css from './chat-actions.module.scss';

export const ChatActions = (): JSX.Element => {
    const { token } = useAuth();
    const dispatch = useAppDispatch();

    const ratingState = useUserRatingSelector();
    const profileState = useProfileInfoSelector();
    const { realtorId, customerId } = useSingleChatInfoSelector();
    const userId = profileState.data.id === realtorId ? customerId : realtorId;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token.accessToken && userId) {
            dispatch(canRateThunk(userId)).finally(() => setLoading(false));
        }
    }, [dispatch, token.accessToken, userId]);

    return (
        <StickyModal>
            <ul>
                <li className={css.li}>
                    <button className={css.btn} onClick={chatFontSize} type="button">
                        <HPlusMobiledataOutlinedIcon />
                        <span>Змінити розмір шрифту</span>
                    </button>
                </li>
                <li className={css.li}>
                    <button
                        className={clsx(css.btn, { [css.disabled]: loading || !ratingState.canRate })}
                        onClick={() => ratingState.canRate && rateUserModal({ userId })}
                        type="button"
                    >
                        {loading ? <img src="/spinner.gif" alt="" /> : <StarBorderRoundedIcon />}
                        <span>
                            <span>{ratingState.isRated ? 'Змінити оцінку' : 'Оцініть чат з користувачем'}</span>
                            {!ratingState.canRate && <small>Недостатньо повідомлень в чаті</small>}
                        </span>
                    </button>
                </li>
                <li className={css.li}>
                    <p className={clsx(css.btn, css.disabled)}>
                        <FilePresentOutlinedIcon />
                        <span>Прикріпити файл (в розробці)</span>
                    </p>
                </li>
            </ul>
        </StickyModal>
    );
};

const chatActions = (): void => {
    modal.open(<ChatActions />);
};

export default chatActions;

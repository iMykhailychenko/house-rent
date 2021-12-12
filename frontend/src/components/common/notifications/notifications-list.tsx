import React, { useEffect } from 'react';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import clsx from 'clsx';
import Image from 'next/image';

import uiConfig from '../../../config/ui.config';
import { useAppDispatch } from '../../../hooks/redux.hook';
import { NotificationsType } from '../../../state/entities/notifications/notifications.interface';
import {
    useNotificationsLoadingSelector,
    useNotificationsSelector,
} from '../../../state/entities/notifications/notifications.selector';
import {
    deleteAllNotificationsThunk,
    deleteNotificationByIdThunk,
    notificationsListPaginationThunk,
    notificationsListThunk,
} from '../../../state/entities/notifications/notifications.thunk';
import Button from '../button/button';
import ImageWrp from '../image-wrp/image-wrp';
import TextSkeleton from '../skeletons/text-skeleton/text-skeleton';

import css from './notifications-list.module.scss';
import NotificationsTemplate from './notifications-template';

const Empty = (): JSX.Element => (
    <div className={css.emptyWrp}>
        <div className={css.empty}>
            <ImageWrp name="empty" />
        </div>
        <h4>У вас немає повідомлень</h4>
        <p>Створіть ваше перше оголошення та станьте на крок ближче до квартири мрії</p>
    </div>
);

const Loader = (): JSX.Element => (
    <>
        {[1, 2, 3].map(item => (
            <div className={css.loader} key={item}>
                <TextSkeleton amount={3} />
            </div>
        ))}
    </>
);

const iconsMap = {
    [NotificationsType.NEW_CHAT]: '/icons/diary.png',
    [NotificationsType.NEW_MESSAGE]: '/icons/chat.png',
    [NotificationsType.NEW_FAVORITE]: '/icons/case.png',
};

const NotificationsList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const notifications = useNotificationsSelector();
    const loadingState = useNotificationsLoadingSelector();

    useEffect(() => {
        dispatch(notificationsListThunk());
    }, [dispatch]);

    const handleDeleteAll = (): void => {
        dispatch(deleteAllNotificationsThunk());
    };

    const deleteById = (id: number) => async (): Promise<void> => {
        await dispatch(deleteNotificationByIdThunk(id));
        if (notifications.data.length <= 1) {
            dispatch(notificationsListThunk());
        }
    };

    const loadMore = (): void => {
        if (
            uiConfig.notificationsPerPage > notifications.data.length ||
            notifications.data.length > uiConfig.notificationsPerPage * notifications.currentPage
        ) {
            dispatch(notificationsListThunk());
        } else {
            dispatch(notificationsListPaginationThunk(notifications.currentPage + 1));
        }
    };

    return (
        <div
            className={clsx(css.inner, {
                [css.loading]: loadingState !== 'success',
            })}
        >
            <div className={css.header}>
                {!!notifications.data.length && (
                    <button
                        className={clsx(css.link, { [css.disabled]: loadingState !== 'success' })}
                        onClick={handleDeleteAll}
                        type="button"
                    >
                        Видалити усі
                    </button>
                )}
            </div>

            {loadingState !== 'success' ? (
                <Loader />
            ) : notifications.data.length ? (
                notifications.data.map(item => (
                    <div className={css.item} key={item.id}>
                        <Image width={25} height={30} objectFit="contain" src={iconsMap[item.type]} alt="" />
                        <div className={css.mid}>
                            <NotificationsTemplate value={item} />
                        </div>
                        <Button onClick={deleteById(item.id)} className={css.btn}>
                            <DeleteOutlineIcon />
                        </Button>
                    </div>
                ))
            ) : (
                <Empty />
            )}

            {!!notifications.totalPages && notifications.currentPage !== notifications.totalPages && (
                <button className={css.more} type="button" onClick={loadMore}>
                    Завантажити більше
                </button>
            )}
        </div>
    );
};

export default NotificationsList;

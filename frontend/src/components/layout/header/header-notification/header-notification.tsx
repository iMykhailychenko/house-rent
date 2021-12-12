import React, { useEffect } from 'react';

import clsx from 'clsx';
import ReactDOM from 'react-dom';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import { resetNotificationsCountAction } from '../../../../state/entities/notifications/notifications.reducer';
import { useNotificationsSelector } from '../../../../state/entities/notifications/notifications.selector';
import NotificationsList from '../../../common/notifications/notifications-list';

import css from './header-notification.module.scss';

interface IProps {
    onClose: () => void;
}

const HeaderNotification = ({ onClose }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const notifications = useNotificationsSelector();

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    const handleClose = (): void => {
        dispatch(resetNotificationsCountAction());
        onClose();
    };

    return ReactDOM.createPortal(
        <>
            <div className={css.backdrop} onClick={handleClose} aria-hidden="true" />
            <div className={clsx(css.root, { [css.center]: !notifications.data.length })}>
                <NotificationsList />
            </div>
        </>,
        document.body,
    );
};

export default HeaderNotification;

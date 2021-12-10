import React from 'react';

import Link from 'next/link';

import { INotification, NotificationsType } from '../../../state/entities/notifications/notifications.interface';
import routes from '../../../utils/routes';

interface IProps {
    value: INotification;
}

const notificationsMap = {
    [NotificationsType.NEW_CHAT]: (value: INotification): JSX.Element => (
        <>
            <span>Новий відгук від</span>{' '}
            <Link href={routes.users.profile(value.user.id)}>
                <a>
                    {value.user.firstName} {value.user.lastName}
                </a>
            </Link>{' '}
            <span>на ваше</span>{' '}
            <Link href={routes.posts.single(value.postId)}>
                <a>оголошення</a>
            </Link>
            <br />
            <Link href={routes.chats.messages(value.postId)}>
                <a>Переглянути повідомлення</a>
            </Link>
        </>
    ),
    [NotificationsType.NEW_MESSAGE]: (value: INotification): JSX.Element => (
        <>
            <span>Нове повідомле від</span>{' '}
            <Link href={routes.users.profile(value.user.id)}>
                <a>
                    {value.user.firstName} {value.user.lastName}
                </a>
            </Link>
            <br />
            <Link href={routes.chats.messages(value.chatId)}>
                <a>Переглянути повідомлення</a>
            </Link>
        </>
    ),
    [NotificationsType.NEW_FAVORITE]: (value: INotification): JSX.Element => (
        <>
            <span>Вітаємо! Користувач</span>{' '}
            <Link href={routes.users.profile(value.user.id)}>
                <a>
                    {value.user.firstName} {value.user.lastName}
                </a>
            </Link>{' '}
            <span>додав(ла) ваше</span>{' '}
            <Link href={routes.posts.single(value.postId)}>
                <a>оголошення</a>
            </Link>{' '}
            <span>в обрані</span>
        </>
    ),
};

const NotificationsTemplate = ({ value }: IProps): JSX.Element => {
    return notificationsMap[value.type](value);
};

export default NotificationsTemplate;

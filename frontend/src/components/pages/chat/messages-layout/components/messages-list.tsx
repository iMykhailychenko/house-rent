import React, { ReactElement } from 'react';

import Link from 'next/link';

import { Message } from '../../../../../state/entities/chats/chats.interface';
import { formatTime } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';
import css from '../messages-layout.module.scss';

interface IProps {
    isFirstMessage?: boolean;
    message: Message;
}
const MessagesList = ({ isFirstMessage = false, message }: IProps): ReactElement => {
    return (
        <>
            <div className={css.textWrp}>
                <p className={css.text}>{message.text}</p>
                <span className={css.time}>{formatTime(message.creationDate)}</span>
            </div>
            {isFirstMessage && (
                <Link href={routes.users.profile(message.author.id)}>
                    <a className={css.flex}>
                        <UserAvatar
                            className={css.avatar}
                            src={message.author.avatar}
                            firstName={message.author.firstName}
                            lastName={message.author.lastName}
                            diameter={3.5}
                        />
                        <p className={css.user}>
                            {message.author.firstName} {message.author.lastName}
                        </p>
                    </a>
                </Link>
            )}
        </>
    );
};

export default MessagesList;

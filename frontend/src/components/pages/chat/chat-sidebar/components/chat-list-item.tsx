import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { Chat } from '../../../../../state/entities/chats/chats.interface';
import { cutString } from '../../../../../utils/helpers';
import routes from '../../../../../utils/routes';
import Badge from '../../../../common/badge/badge';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';
import css from '../chat-sidebar.module.scss';

interface IProps {
    chat: Chat[];
}

const ChatListItem = ({ chat }: IProps): ReactElement => {
    return (
        <>
            {chat.map(data => (
                <Link key={data.id} href={routes.chats.messages(data.id)}>
                    <a className={clsx(css.item, data.newMessages && css.new)}>
                        <Badge number={data.newMessages} />
                        <UserAvatar
                            diameter={5}
                            src={data.recipient.avatar}
                            firstName={data.recipient.firstName}
                            lastName={data.recipient.lastName}
                        />
                        <div className={css.inner}>
                            <h4 className={css.title}>
                                {data.recipient.firstName} {data.recipient.lastName}
                            </h4>
                            <p className={css.text}>{cutString(data.lastMessage, 60)}</p>
                        </div>
                    </a>
                </Link>
            ))}
        </>
    );
};

export default ChatListItem;

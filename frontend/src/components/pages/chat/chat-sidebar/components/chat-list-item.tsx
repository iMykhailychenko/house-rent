import React, { ReactElement } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
    const history = useRouter();
    const chatId = +String(history.query.chatId);

    return (
        <>
            {chat.map(data => (
                <Link key={data.id} href={routes.chats.messages(data.id)}>
                    <a className={clsx(css.item, { [css.new]: data.unreadMessages, [css.active]: chatId === data.id })}>
                        <Badge number={data.unreadMessages} />
                        <UserAvatar
                            diameter={5}
                            src={data.user.avatar}
                            firstName={data.user.firstName}
                            lastName={data.user.lastName}
                        />
                        <div className={css.inner}>
                            <h4 className={css.title}>
                                {data.user.firstName} {data.user.lastName}
                            </h4>
                            <p className={css.text}>{data.lastMessage.text ? cutString(data.lastMessage.text, 60) : '...'}</p>
                        </div>
                    </a>
                </Link>
            ))}
        </>
    );
};

export default ChatListItem;

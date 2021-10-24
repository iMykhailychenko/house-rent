import React, { ReactElement } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../../hooks/chat.hook';
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
    const socket = useChatSocket();

    const handleOpenChat = (id: number) => () => {
        socket?.switchChat(id);
        history.push(routes.chats.messages(id));
    };

    return (
        <>
            {chat.map(data => (
                <button
                    key={data.id}
                    type="button"
                    onClick={handleOpenChat(data.id)}
                    className={clsx(css.item, {
                        [css.new]: data.unreadMessages,
                        [css.active]: chatId === data.id,
                    })}
                >
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
                        <p className={css.text}>{data?.lastMessage?.text ? cutString(data.lastMessage.text, 60) : '...'}</p>
                    </div>
                </button>
            ))}
        </>
    );
};

export default ChatListItem;

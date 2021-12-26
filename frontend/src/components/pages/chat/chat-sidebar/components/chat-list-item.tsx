import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import uiConfig from '../../../../../config/ui.config';
import { useChatSocket } from '../../../../../hooks/chat.hook';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
import { useChatListSelector } from '../../../../../state/entities/chats/chats.selector';
import { chatListPaginationThunk, chatListThunk } from '../../../../../state/entities/chats/thunks/chat-list.thunk';
import { cutString } from '../../../../../utils/helpers/string.helper';
import routes from '../../../../../utils/routes';
import Badge from '../../../../common/badge/badge';
import UserAvatar from '../../../../common/user/user-avatar/user-avatar';
import css from '../chat-sidebar.module.scss';

const ChatListItem = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const history = useRouter();
    const chatId = Number(history.query.chatId);

    const socket = useChatSocket();
    const chatListState = useChatListSelector();

    const handleOpenChat = (id: number) => () => {
        socket?.switchChat(id);
        history.push(routes.chats.messages(id));
    };

    const loadMore = (): void => {
        if (
            uiConfig.chatsPerPage > chatListState.data.length ||
            chatListState.data.length > uiConfig.chatsPerPage * chatListState.currentPage
        ) {
            dispatch(chatListThunk(1));
        } else {
            dispatch(chatListPaginationThunk(chatListState.currentPage + 1));
        }
    };

    return (
        <>
            {chatListState.data.map(data => (
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
                        className={css.avatar}
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

            {!!chatListState.totalPages && chatListState.currentPage !== chatListState.totalPages && (
                <button onClick={loadMore} className={css.more} type="button">
                    Більше
                </button>
            )}
        </>
    );
};

export default ChatListItem;

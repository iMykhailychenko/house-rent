import React from 'react';

import { useChatListSelector } from '../../../../state/entities/chats/chats.selector';
import ChatItemSkeleton from '../../../common/skeletons/chat/chat-item/chat-item';

import css from './chat-sidebar.module.scss';
import ChatListItem from './components/chat-list-item';

const ChatSidebar = (): JSX.Element => {
    const chatListState = useChatListSelector();
    const loading = chatListState.status === 'idle' || chatListState.status === 'loading';

    return loading ? (
        <ChatItemSkeleton amount={6} />
    ) : chatListState.data.length ? (
        <ChatListItem />
    ) : (
        <div className={css.empty} />
    );
};

export default ChatSidebar;

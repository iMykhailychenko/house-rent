import React, { ReactElement } from 'react';

import { useChatListSelector } from '../../../../state/entities/chats/chats.selector';
import ChatItemSkeleton from '../../../common/skeletons/chat/chat-item/chat-item';

import ChatListItem from './components/chat-list-item';

const ChatSidebar = (): ReactElement => {
    const chatListState = useChatListSelector();
    const loading = chatListState.status === 'idle' || chatListState.status === 'loading';

    return loading ? <ChatItemSkeleton amount={6} /> : <ChatListItem chat={chatListState.data} />;
};

export default ChatSidebar;

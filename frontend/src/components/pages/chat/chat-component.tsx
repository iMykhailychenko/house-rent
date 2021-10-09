import React, { ReactElement } from 'react';

import ChatContainer from '../../layout/chat/chat-container/chat-container';
import ChatSidebarWrp from '../../layout/chat/chat-sidebar-wrp/chat-sidebar-wrp';

import css from './chat-component.module.scss';
import ChatList from './chat-list/chat-list';
import ChatMessages from './chat-messages/chat-messages';
import ChatSidebar from './chat-sidebar/chat-sidebar';

const ChatComponent = (): ReactElement => {
    return (
        <div className={css.root}>
            <ChatSidebarWrp>
                <ChatList />
            </ChatSidebarWrp>
            <ChatContainer>
                <ChatMessages />
            </ChatContainer>
            <ChatSidebarWrp>
                <ChatSidebar />
            </ChatSidebarWrp>
        </div>
    );
};

export default ChatComponent;

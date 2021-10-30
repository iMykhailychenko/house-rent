import React from 'react';

import ChatContainer from '../../../layout/chat/chat-container/chat-container';
import ChatFlow from '../../../layout/chat/chat-flow/chat-flow';
import ChatSidebarWrp from '../../../layout/chat/chat-sidebar-wrp/chat-sidebar-wrp';
import ChatSidebar from '../chat-sidebar/chat-sidebar';

import css from './chat-layout.module.scss';

interface IProps {
    disabled?: boolean;
    children: JSX.Element;
}
const ChatLayout = ({ disabled, children }: IProps): JSX.Element => {
    return (
        <div className={css.root}>
            <ChatSidebarWrp>
                <ChatSidebar />
            </ChatSidebarWrp>
            <ChatContainer>
                <ChatFlow disabled={disabled}>{children}</ChatFlow>
            </ChatContainer>
        </div>
    );
};

export default ChatLayout;

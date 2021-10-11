import React, { ReactElement } from 'react';

import ChatContainer from '../../../layout/chat/chat-container/chat-container';
import ChatFlow from '../../../layout/chat/chat-flow/chat-flow';
import ChatSidebarWrp from '../../../layout/chat/chat-sidebar-wrp/chat-sidebar-wrp';
import ChatSidebar from '../components/chat-sidebar/chat-sidebar';

import css from './chat-component.module.scss';

interface IProps {
    disabled?: boolean;
    children: ReactElement;
}
const ChatComponent = ({ disabled, children }: IProps): ReactElement => {
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

export default ChatComponent;

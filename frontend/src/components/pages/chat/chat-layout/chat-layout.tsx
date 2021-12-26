import React from 'react';

import clsx from 'clsx';

import ChatContainer from '../../../layout/chat/chat-container/chat-container';
import ChatFlow from '../../../layout/chat/chat-flow/chat-flow';
import ChatSidebarWrp from '../../../layout/chat/chat-sidebar-wrp/chat-sidebar-wrp';
import ChatSidebar from '../chat-sidebar/chat-sidebar';

import css from './chat-layout.module.scss';

interface IProps {
    isRootPage?: boolean;
    disabled?: boolean;
    children: JSX.Element;
}
const ChatLayout = ({ disabled, children, isRootPage = false }: IProps): JSX.Element => {
    return (
        <div className={css.root}>
            <ChatSidebarWrp className={clsx(!isRootPage && css.sidebar)}>
                <ChatSidebar />
            </ChatSidebarWrp>
            <ChatContainer className={clsx(isRootPage && css.container)}>
                <ChatFlow disabled={disabled}>{children}</ChatFlow>
            </ChatContainer>
        </div>
    );
};

export default ChatLayout;

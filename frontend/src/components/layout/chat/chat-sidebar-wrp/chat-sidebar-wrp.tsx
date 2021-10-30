import React from 'react';

import css from './chat-sidebar-wrp.module.scss';

interface IProps {
    children?: JSX.Element[] | JSX.Element;
}

const ChatSidebarWrp = ({ children }: IProps): JSX.Element => {
    return <div className={css.sidebar}>{children}</div>;
};
export default ChatSidebarWrp;

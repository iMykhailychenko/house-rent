import React from 'react';

import clsx from 'clsx';

import css from './chat-sidebar-wrp.module.scss';

interface IProps {
    className?: string;
    children?: JSX.Element[] | JSX.Element;
}

const ChatSidebarWrp = ({ children, className }: IProps): JSX.Element => {
    return <div className={clsx(css.sidebar, className)}>{children}</div>;
};
export default ChatSidebarWrp;

import React from 'react';

import clsx from 'clsx';

import css from './chat-container.module.scss';

interface IProps {
    className?: string;
    children?: JSX.Element[] | JSX.Element;
}

const ChatContainer = ({ children, className }: IProps): JSX.Element => {
    return <div className={clsx(css.container, className)}>{children}</div>;
};

export default ChatContainer;

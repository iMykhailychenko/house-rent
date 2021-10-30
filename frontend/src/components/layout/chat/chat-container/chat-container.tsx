import React from 'react';

import css from './chat-container.module.scss';

interface IProps {
    children?: JSX.Element[] | JSX.Element;
}

const ChatContainer = ({ children }: IProps): JSX.Element => {
    return <div className={css.container}>{children}</div>;
};

export default ChatContainer;

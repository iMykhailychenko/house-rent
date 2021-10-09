import React, { ReactElement } from 'react';

import css from './chat-container.module.scss';

interface IProps {
    children?: ReactElement[] | ReactElement;
}

const ChatContainer = ({ children }: IProps): ReactElement => {
    return <div className={css.container}>{children}</div>;
};

export default ChatContainer;

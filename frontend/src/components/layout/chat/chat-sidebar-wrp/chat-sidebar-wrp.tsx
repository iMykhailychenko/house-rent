import React, { ReactElement } from 'react';

import css from './chat-sidebar-wrp.module.scss';

interface IProps {
    children?: ReactElement[] | ReactElement;
}

const ChatSidebarWrp = ({ children }: IProps): ReactElement => {
    return <div className={css.sidebar}>{children}</div>;
};
export default ChatSidebarWrp;

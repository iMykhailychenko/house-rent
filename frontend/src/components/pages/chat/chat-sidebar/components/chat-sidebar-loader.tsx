import React, { ReactElement } from 'react';

import css from '../chat-sidebar.module.scss';

const ChatSidebarLoader = (): ReactElement => {
    return (
        <div className={css.loader}>
            <img src="/spinner.gif" alt="" />
        </div>
    );
};

export default ChatSidebarLoader;

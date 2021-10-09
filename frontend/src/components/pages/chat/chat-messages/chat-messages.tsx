import React, { ReactElement } from 'react';

import css from './chat-messages.module.scss';
import ChatFlow from './components/chat-flow/chat-flow';
import ChatForm from './components/chat-form/chat-form';

const ChatMessages = (): ReactElement => {
    return (
        <div className={css.root}>
            <ChatFlow />
            <ChatForm />
        </div>
    );
};

export default ChatMessages;

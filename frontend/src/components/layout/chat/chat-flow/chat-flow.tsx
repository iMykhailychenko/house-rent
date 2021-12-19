import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import css from './chat-flow.module.scss';
import ChatForm from './chat-form/chat-form';

interface IProps {
    children: JSX.Element;
    disabled?: boolean;
}

const ChatFlow = ({ disabled, children }: IProps): JSX.Element => {
    const router = useRouter();
    const chatId = Number(router.query.chatId);

    return (
        <div className={css.root}>
            <div id="chat-wrp" className={css.flow}>
                <div id="chat-inner-wrp" className={clsx(css.scroll, { [css.disabled]: disabled, [css.withForm]: chatId })}>
                    {children}
                </div>
            </div>
            {chatId ? <ChatForm /> : null}
        </div>
    );
};

export default ChatFlow;

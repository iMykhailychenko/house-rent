import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { useMessageSelector, useMessageStatusSelector } from '../../../../state/entities/chats/chats.selector';

import css from './chat-flow.module.scss';
import ChatForm from './chat-form/chat-form';

interface IProps {
    children: JSX.Element;
    disabled?: boolean;
}

const ChatFlow = ({ disabled, children }: IProps): JSX.Element => {
    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const ref = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const status = useMessageStatusSelector();
    const messages = useMessageSelector();

    useEffect(() => {
        if (ref.current && status === 'success') {
            ref.current.scrollTo({ top: innerRef.current?.offsetHeight || 150 });
        }
    }, [ref, innerRef, status, messages]);

    return (
        <div className={css.root}>
            <div ref={ref} className={css.flow}>
                <div ref={innerRef} className={clsx(css.scroll, { [css.disabled]: disabled, [css.withForm]: chatId })}>
                    {children}
                </div>
            </div>
            {chatId ? <ChatForm /> : null}
        </div>
    );
};

export default ChatFlow;

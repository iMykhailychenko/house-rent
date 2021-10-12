import React, { ReactElement, useEffect, useRef } from 'react';

import clsx from 'clsx';

import { useMessageStatusSelector } from '../../../../state/entities/chats/chats.selector';

import css from './chat-flow.module.scss';
import ChatForm from './chat-form/chat-form';

interface IProps {
    children: ReactElement;
    disabled?: boolean;
}

const ChatFlow = ({ disabled, children }: IProps): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const status = useMessageStatusSelector();

    useEffect(() => {
        if (ref.current && status === 'success') {
            ref.current.scrollTo({ top: innerRef.current?.offsetHeight || 150 });
        }
    }, [ref, innerRef, status]);

    return (
        <div className={css.root}>
            <div ref={ref} className={css.flow}>
                <div ref={innerRef} className={clsx(css.scroll, disabled && css.disabled)}>
                    {children}
                </div>
            </div>
            <ChatForm disabled={disabled} />
        </div>
    );
};

export default ChatFlow;

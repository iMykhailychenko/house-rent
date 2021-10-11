import React, { ReactElement } from 'react';

import clsx from 'clsx';

import css from './chat-flow.module.scss';
import ChatForm from './chat-form/chat-form';

interface IProps {
    children: ReactElement;
    disabled?: boolean;
}

const ChatFlow = ({ disabled, children }: IProps): ReactElement => {
    return (
        <div className={css.root}>
            <div className={css.flow}>
                <div className={clsx(css.scroll, disabled && css.disabled)}>{children}</div>
            </div>
            <ChatForm disabled={disabled} />
        </div>
    );
};

export default ChatFlow;

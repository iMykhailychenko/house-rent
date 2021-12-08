import React, { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useAppDispatch } from '../../../../hooks/redux.hook';
import { useChatListSelector } from '../../../../state/entities/chats/chats.selector';
import { chatListThunk } from '../../../../state/entities/chats/chats.thunk';

interface IProps {
    children: ReactNode;
}

const ChatListEffect = ({ children }: IProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const chatState = useChatListSelector();

    const history = useRouter();
    const page = +String(history.query.page || 1);

    useEffect(() => {
        if (chatState.status === 'idle') {
            dispatch(chatListThunk(page));
        }
    }, [dispatch, page, chatState.status]);

    return <>{children}</>;
};

export default ChatListEffect;

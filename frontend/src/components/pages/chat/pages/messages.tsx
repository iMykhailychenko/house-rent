import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../hooks/chat.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { Message } from '../../../../state/entities/chats/chats.interface';
import { pushMessage, updateMessage } from '../../../../state/entities/chats/chats.reducer';
import { useMessageStatusSelector } from '../../../../state/entities/chats/chats.selector';
import { messagesListThunk, singleChatThunk } from '../../../../state/entities/chats/chats.thunk';
import MessagesSkeleton from '../../../common/skeletons/chat/messages/messages';
import MessagesLayout from '../messages-layout/messages-layout';

const MessagesListEffect = (): JSX.Element => {
    const socket = useChatSocket();
    const dispatch = useAppDispatch();

    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const messageStatus = useMessageStatusSelector();
    const isLoading = messageStatus === 'idle' || messageStatus === 'loading';

    useEffect(() => {
        dispatch(singleChatThunk(chatId));
    }, [dispatch, chatId]);

    useEffect(() => {
        socket?.client?.on('msgToClient', (msg: Message) => {
            dispatch(pushMessage(msg));
        });
        socket?.client?.on('messageEdited', (msg: Message) => {
            dispatch(updateMessage(msg));
        });
    }, [socket, dispatch]);

    useEffect(() => {
        if (messageStatus === 'idle') {
            dispatch(messagesListThunk({ chatId }));
        }
    }, [chatId, dispatch, messageStatus]);

    return isLoading ? <MessagesSkeleton /> : <MessagesLayout />;
};

export default MessagesListEffect;

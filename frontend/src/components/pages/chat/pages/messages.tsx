import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../hooks/chat.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { Message } from '../../../../state/entities/chats/chats.interface';
import { pushMessageAction, updateMessageAction } from '../../../../state/entities/chats/chats.reducer';
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
        const chatWrp = document.getElementById('chat-wrp');
        const chatInnerWrp = document.getElementById('chat-inner-wrp');

        if (chatWrp && messageStatus === 'success') {
            chatWrp.scrollTo({ top: chatInnerWrp?.offsetHeight || 150 });
        }
    }, [messageStatus]);

    useEffect(() => {
        if (socket?.client) {
            const msgToClient = (msg: Message) => {
                dispatch(pushMessageAction(msg));

                const chatWrp = document.getElementById('chat-wrp');
                const chatInnerWrp = document.getElementById('chat-inner-wrp');
                chatWrp?.scrollTo({ top: chatInnerWrp?.offsetHeight || 150 });
            };
            const messageEdited = (msg: Message) => dispatch(updateMessageAction(msg));
            socket.client.on('msgToClient', msgToClient);
            socket.client.on('messageEdited', messageEdited);

            return () => {
                socket.client?.off('msgToClient', msgToClient);
                socket.client?.off('messageEdited', messageEdited);
                socket.unsubscribe();
            };
        }
    }, [socket, dispatch]);

    useEffect(() => {
        dispatch(messagesListThunk({ chatId }));
    }, [chatId, dispatch]);

    return isLoading ? <MessagesSkeleton /> : <MessagesLayout />;
};

export default MessagesListEffect;

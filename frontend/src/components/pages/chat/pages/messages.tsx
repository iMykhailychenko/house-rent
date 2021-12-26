import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useChatSocket } from '../../../../hooks/chat.hook';
import { useAppDispatch } from '../../../../hooks/redux.hook';
import { Message } from '../../../../state/entities/chats/chats.interface';
import { pushMessageAction, updateMsgStatusAction } from '../../../../state/entities/chats/chats.reducer';
import { useMessageStatusSelector } from '../../../../state/entities/chats/chats.selector';
import { messagesListThunk } from '../../../../state/entities/chats/thunks/messages-list.thunk';
import { singleChatThunk } from '../../../../state/entities/chats/thunks/single-chat.thunk';
import { useProfileInfoSelector } from '../../../../state/entities/profile/profile.selector';
import MessagesSkeleton from '../../../common/skeletons/chat/messages/messages';
import MessagesLayout from '../messages-layout/messages-layout';

interface JoinChat {
    chatId: number;
    userId: number;
}

const MessagesListEffect = (): JSX.Element => {
    const socket = useChatSocket();
    const dispatch = useAppDispatch();

    const router = useRouter();
    const chatId = Number(router.query.chatId);

    const profileState = useProfileInfoSelector();
    const userId = profileState.data.id;

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
            socket.client.on('msgToClient', msgToClient);

            return () => {
                socket.client?.off('msgToClient', msgToClient);
                socket.unsubscribe();
            };
        }
    }, [dispatch, socket, socket?.client]);

    useEffect(() => {
        if (socket?.client) {
            const userJoined = (msg: JoinChat) => {
                if (msg.userId !== userId) {
                    dispatch(updateMsgStatusAction());
                }
            };
            socket.client.on('userJoined', userJoined);

            return () => {
                socket.client?.off('userJoined', userJoined);
            };
        }
    }, [dispatch, socket?.client, userId]);

    useEffect(() => {
        dispatch(messagesListThunk({ chatId }));
    }, [chatId, dispatch]);

    return isLoading ? <MessagesSkeleton /> : <MessagesLayout />;
};

export default MessagesListEffect;

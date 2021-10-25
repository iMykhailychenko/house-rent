import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import MessagesSkeleton from '../../components/common/skeletons/chat/messages/messages';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import MessagesLayout from '../../components/pages/chat/messages-layout/messages-layout';
import useAuth from '../../hooks/auth.hook';
import { useChatSocket } from '../../hooks/chat.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { Message } from '../../state/entities/chats/chats.interface';
import { pushMessage } from '../../state/entities/chats/chats.reducer';
import { useMessageStatusSelector } from '../../state/entities/chats/chats.selector';
import { chatListThunk, messagesListThunk, singleChatThunk } from '../../state/entities/chats/chats.thunk';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chats.module.scss';

const Messages = (): ReactElement => {
    const [auth] = useAuth();
    const socket = useChatSocket();
    const dispatch = useAppDispatch();

    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const messageStatus = useMessageStatusSelector();
    const isLoading = messageStatus === 'idle' || messageStatus === 'loading';

    useEffect(() => {
        socket?.client?.on('msgToClient', (msg: Message) => {
            dispatch(pushMessage(msg));
        });
    }, [socket, dispatch]);

    useEffect(() => {
        if (auth?.accessToken && messageStatus === 'idle') {
            dispatch(messagesListThunk({ chatId }));
        }
    }, [chatId, dispatch, auth?.accessToken, messageStatus]);

    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="md" className={css.container}>
                <ChatLayout>{isLoading ? <MessagesSkeleton /> : <MessagesLayout />}</ChatLayout>
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect(async ctx => {
    await ctx.store?.dispatch(singleChatThunk(+String(ctx.query.chatId)));
    await ctx.store?.dispatch(chatListThunk({ page: 1 }));
});

export default Messages;

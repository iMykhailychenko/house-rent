import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import MessagesSkeleton from '../../components/common/skeletons/chat/messages/messages';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import MessagesLayout from '../../components/pages/chat/messages-layout/messages-layout';
import useAuth from '../../hooks/auth.hook';
import { useChatSocket } from '../../hooks/chat.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { Message } from '../../state/entities/chats/chats.interface';
import { pushMessage, updateMessage } from '../../state/entities/chats/chats.reducer';
import { useMessageStatusSelector } from '../../state/entities/chats/chats.selector';
import { messagesListThunk } from '../../state/entities/chats/chats.thunk';

import css from './chats.module.scss';

const MessagesPage = (): JSX.Element => {
    const { token } = useAuth();
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
        socket?.client?.on('messageEdited', (msg: Message) => {
            dispatch(updateMessage(msg));
        });
    }, [socket, dispatch]);

    useEffect(() => {
        if (token.accessToken && messageStatus === 'idle') {
            dispatch(messagesListThunk({ chatId }));
        }
    }, [chatId, dispatch, token.accessToken, messageStatus]);

    return (
        <>
            <Meta />
            <RootLayout withFooter={false} className={css.root}>
                <Container size="md" className={css.container}>
                    <ChatLayout>{isLoading ? <MessagesSkeleton /> : <MessagesLayout />}</ChatLayout>
                </Container>
            </RootLayout>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = withAuthRedirect(async ctx => {
//     await ctx.store?.dispatch(singleChatThunk(+String(ctx.query.chatId)));
//     await ctx.store?.dispatch(chatListThunk({ page: 1 }));
// });

export default MessagesPage;

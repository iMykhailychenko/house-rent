import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import MessagesSkeleton from '../../components/common/skeletons/chat/messages/messages';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import MessagesLayout from '../../components/pages/chat/messages-layout/messages-layout';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { useChatsStatusSelector, useMessageStatusSelector } from '../../state/entities/chats/chats.selector';
import { chatListThunk, messagesListThunk } from '../../state/entities/chats/chats.thunk';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chats.module.scss';

const Messages = (): ReactElement => {
    const dispatch = useAppDispatch();
    const [auth] = useAuth();
    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const chatStatus = useChatsStatusSelector();
    const messageStatus = useMessageStatusSelector();
    const isLoading = messageStatus === 'idle' || messageStatus === 'loading';

    useEffect(() => {
        if (auth?.accessToken) {
            if (chatStatus === 'idle') dispatch(chatListThunk());
            if (messageStatus === 'idle') dispatch(messagesListThunk({ chatId }));
        }
    }, [chatId, chatStatus, dispatch, auth?.accessToken, messageStatus]);

    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="md" className={css.container}>
                <ChatLayout>{isLoading ? <MessagesSkeleton /> : <MessagesLayout />}</ChatLayout>
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Messages;

import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import MessagesLayout from '../../components/pages/chat/messages-layout/messages-layout';
import { useAppDispatch } from '../../hooks/redux.hook';
import { useMessageStatusSelector } from '../../state/entities/chats/chats.selector';
import { chatListThunk, messagesListThunk } from '../../state/entities/chats/chats.thunk';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chats.module.scss';

const Messages = (): ReactElement => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const chatId = +String(router.query.chatId);

    const status = useMessageStatusSelector();
    const isLoading = status === 'idle' || status === 'loading';

    useEffect(() => {
        dispatch(chatListThunk());
        dispatch(messagesListThunk({ chatId }));
    }, [chatId, dispatch]);

    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="md" className={css.container}>
                <ChatLayout>{isLoading ? <p>Loading ...</p> : <MessagesLayout />}</ChatLayout>
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Messages;

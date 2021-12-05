import React, { useEffect } from 'react';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import ChatBanner from '../../components/pages/chat/chat-banner/chat-banner';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { chatListThunk } from '../../state/entities/chats/chats.thunk';

import css from './chats.module.scss';

const ChatsPage = (): JSX.Element => {
    const { token } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token.accessToken) dispatch(chatListThunk({ page: 1, withLoader: true }));
    }, [dispatch, token.accessToken]);

    return (
        <>
            <Meta />
            <RootLayout withFooter={false} className={css.root}>
                <Container size="md" className={css.container}>
                    <ChatLayout disabled>
                        <ChatBanner />
                    </ChatLayout>
                </Container>
            </RootLayout>
        </>
    );
};

export default ChatsPage;

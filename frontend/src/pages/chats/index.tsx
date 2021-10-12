import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatBanner from '../../components/pages/chat/chat-banner/chat-banner';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import { useAppDispatch } from '../../hooks/redux.hook';
import { chatListThunk } from '../../state/entities/chats/chats.thunk';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chats.module.scss';

const Chats = (): ReactElement => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(chatListThunk());
    }, [dispatch]);

    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="md" className={css.container}>
                <ChatLayout disabled>
                    <ChatBanner />
                </ChatLayout>
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Chats;

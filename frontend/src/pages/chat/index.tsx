import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatComponent from '../../components/pages/chat/chat-component';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chat.module.scss';

const Chat = (): ReactElement => {
    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="lg" className={css.container}>
                <ChatComponent />
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Chat;

import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import ChatListEffect from '../../components/pages/chat/pages/chats';
import MessagesListEffect from '../../components/pages/chat/pages/messages';
import routes from '../../utils/routes';

import css from './chats.module.scss';

const MessagesPage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <RootLayout href={routes.chats.init} withFooter={false} className={css.root}>
                    <ChatListEffect>
                        <Container size="md" className={css.container}>
                            <ChatLayout>
                                <MessagesListEffect />
                            </ChatLayout>
                        </Container>
                    </ChatListEffect>
                </RootLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default MessagesPage;

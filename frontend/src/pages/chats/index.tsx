import React from 'react';

import AuthRedirect from '../../components/common/auth/auth-redirect/auth-redirect';
import GetStaticProfile from '../../components/common/auth/get-static-profile/get-static-profile';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Meta from '../../components/meta/meta';
import ChatBanner from '../../components/pages/chat/chat-banner/chat-banner';
import ChatLayout from '../../components/pages/chat/chat-layout/chat-layout';
import ChatListEffect from '../../components/pages/chat/pages/chats';
import routes from '../../utils/routes';

import css from './chats.module.scss';

const ChatsPage = (): JSX.Element => {
    return (
        <AuthRedirect>
            <GetStaticProfile>
                <Meta />
                <RootLayout backBtnHref={routes.home} withFooter={false} className={css.root}>
                    <ChatListEffect>
                        <Container size="md" className={css.container}>
                            <ChatLayout isRootPage disabled>
                                <ChatBanner />
                            </ChatLayout>
                        </Container>
                    </ChatListEffect>
                </RootLayout>
            </GetStaticProfile>
        </AuthRedirect>
    );
};

export default ChatsPage;

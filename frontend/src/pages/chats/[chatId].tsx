import React, { ReactElement, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import ChatComponent from '../../components/pages/chat/chats-page/chat-component';
import { useAppDispatch } from '../../hooks/redux.hook';
import { chatListThunk } from '../../state/entities/chats/chats.thunk';
import { withAuthRedirect } from '../../utils/ssr';

import css from './chats.module.scss';

const Messages = (): ReactElement => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(chatListThunk());
    }, [dispatch]);

    return (
        <RootLayout withFooter={false} className={css.root}>
            <Container size="md" className={css.container}>
                <ChatComponent>
                    <>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis culpa deleniti, doloremque
                        eius excepturi iste libero modi nemo, non provident, ut. Cumque dicta dolor, nihil quibusdam rerum
                        similique voluptate!
                    </>
                </ChatComponent>
            </Container>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default Messages;

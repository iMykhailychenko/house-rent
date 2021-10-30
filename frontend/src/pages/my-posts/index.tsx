import React, { useEffect } from 'react';

import axios from 'axios';
import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import MyPostsList from '../../components/pages/my-posts/my-posts';
import useAuth from '../../hooks/auth.hook';
import { useAppDispatch } from '../../hooks/redux.hook';
import { POST_STATUS } from '../../state/entities/posts/posts.interface';
import { personalPostsListThunk } from '../../state/entities/posts/thunks/personal-posts.thunk';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import { withAuthRedirect } from '../../utils/ssr';

const MyPosts = (): JSX.Element => {
    const [auth] = useAuth();
    const dispatch = useAppDispatch();
    const profile = useProfileInfoSelector();

    useEffect(() => {
        if (auth?.accessToken) {
            dispatch(personalPostsListThunk({ status: POST_STATUS.IDLE, page: 1 }));
        }
    }, [auth?.accessToken, dispatch, profile.data.id]);

    return (
        <PrivateLayout>
            <Container size="lg">
                <>{auth?.accessToken ? <MyPostsList /> : null}</>
            </Container>
        </PrivateLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default MyPosts;

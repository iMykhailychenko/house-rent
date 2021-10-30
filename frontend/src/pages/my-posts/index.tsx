import React, { useEffect } from 'react';

import { GetServerSideProps } from 'next';

import Container from '../../components/layout/container/container';
import PrivateLayout from '../../components/layout/private-layout/private-layout';
import MyPostsList from '../../components/pages/my-posts/my-posts';
import { useAppDispatch } from '../../hooks/redux.hook';
import { getUserPostsListThunk } from '../../state/entities/posts/thunks/user-posts.thunk';
import { useProfileInfoSelector } from '../../state/entities/profile/profile.selector';
import { withAuthRedirect } from '../../utils/ssr';

const MyPosts = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const profile = useProfileInfoSelector();

    useEffect(() => {
        dispatch(getUserPostsListThunk({ userId: profile.data.id, page: 1 }));
    }, [dispatch, profile.data.id]);

    return (
        <PrivateLayout>
            <Container size="lg">
                <MyPostsList />
            </Container>
        </PrivateLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withAuthRedirect();

export default MyPosts;

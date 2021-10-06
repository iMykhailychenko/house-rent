import React, { ReactElement } from 'react';

import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import PostFilters from '../../components/common/post/post-filters/post-filters';
import PostsList from '../../components/common/post/posts-list/posts-list';
import Container from '../../components/layout/container/container';
import RootLayout from '../../components/layout/root-layout/root-layout';
import Section from '../../components/layout/section/section';
import UserBanner from '../../components/pages/users/user-banner/user-banner';
import { useAppDispatch } from '../../hooks/redux.hook';
import { usePostListSelector } from '../../state/entities/posts/posts.selector';
import { getUserPostsListPaginationThunk, getUserPostsListThunk } from '../../state/entities/posts/posts.thunk';
import { userInfoThunk } from '../../state/entities/users/users.thunk';
import { withStore } from '../../utils/ssr';

const UserProfile = (): ReactElement => {
    const dispatch = useAppDispatch();
    const postsState = usePostListSelector();

    const router = useRouter();
    const userId = +String(router.query.userId);

    const submit = (): void => {
        dispatch(getUserPostsListThunk({ userId, page: 1 }));
    };
    const openPage = async (page: number): Promise<void> => {
        await dispatch(getUserPostsListThunk({ userId, page })).unwrap();
    };
    const loadMore = async (page: number): Promise<void> => {
        await dispatch(getUserPostsListPaginationThunk({ userId, page })).unwrap();
    };

    return (
        <RootLayout>
            <Container size="lg">
                <UserBanner />
            </Container>
            <Section id="home-posts">
                <PostsList title="Усі активні пости користувача" posts={postsState} onPage={openPage} onMore={loadMore}>
                    <PostFilters onSubmit={submit} />
                </PostsList>
            </Section>
        </RootLayout>
    );
};

export const getServerSideProps: GetServerSideProps = withStore(async ctx => {
    const page = +String(ctx.query?.page || 1);
    const userId = +String(ctx.params?.userId || 0);

    if (!userId) return;
    await ctx.store?.dispatch(getUserPostsListThunk({ userId, page }));
    await ctx.store?.dispatch(userInfoThunk(userId));
});

export default UserProfile;
